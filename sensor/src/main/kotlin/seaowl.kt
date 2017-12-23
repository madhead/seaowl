import kotlinx.cinterop.*
import platform.posix.*
import mqtt.*

fun decrypt(encrypted: IntArray, key: IntArray): IntArray {
	val cstate = arrayOf(0x48, 0x74, 0x65, 0x6D, 0x70, 0x39, 0x39, 0x65)
	val shuffle = arrayOf(2, 4, 0, 7, 1, 6, 5, 3)

	val phase1 = IntArray(8)

	shuffle.forEachIndexed { index, value -> phase1[value] = encrypted[index] }

	val phase2 = IntArray(8)

	for (i in 0..7) {
		phase2[i] = phase1[i] xor key[i]
	}

	val phase3 = IntArray(8)

	for (i in 0..7) {
		phase3[i] = ((phase2[i] ushr 3) or (phase2[(i - 1 + 8) % 8] shl 5)) and 0xFF
	}

	val phase4 = IntArray(8)

	for (i in 0..7) {
		phase4[i] = ((cstate[i] ushr 4) or (cstate[i] shl 4)) and 0xFF
	}

	val phase5 = IntArray(8)

	for (i in 0..7) {
		phase5[i] = (0x100 + phase3[i] - phase4[i]) and 0xFF
	}

	return phase5
}

fun main(args: Array<String>) {
	val device = open(args[0], _IOS_APPEND or _IOS_BIN)
	val feature = 0xC0094806 //HIDIOCSFEATURE_9
	val key = intArrayOf(0xC4, 0xC6, 0xC0, 0x92, 0x40, 0x23, 0xDC, 0x96)

	ioctl(device, feature, (intArrayOf(0x00) + key).map { it.toByte() }.toByteArray().refTo(0))

	val values = HashMap<Int, Int>()
	val frame = ByteArray(8)

	while (true) {
		read(device, frame.refTo(0), 8)

		val decrypted = decrypt(frame.map { it.toInt() and 0xFF }.toIntArray(), key)

		if (decrypted[4] == 0x0D && (decrypted.sliceArray(0..2).sum() and 0xFF) == decrypted[3]) {
			val k = decrypted[0]
			val v = (decrypted[1] shl 8) or decrypted[2]

			values[k] = v

			if (values.containsKey(0x50) && values.containsKey(0x42)) {
				val ppm = values[0x50]!!
				val temp = values[0x42]!! / 16.0 - 273.15

				// VW-style CO2 emission check
				if (ppm in 0..5000) {
					memScoped {
						val client = alloc<MQTTClientVar>()

						MQTTClient_create(client.ptr, "tcp://localhost:1883", "seaowl", MQTTCLIENT_PERSISTENCE_NONE, null)

						val connectionOptions: CValue<MQTTClient_connectOptions> = MQTTClient_connectOptions_seed().copy {
							keepAliveInterval = 20
							cleansession = 1
						}

						val connection = MQTTClient_connect(client.value, connectionOptions)

						if (MQTTCLIENT_SUCCESS == connection) {
							val ppmString = ppm.toString().cstr
							val message: CValue<MQTTClient_message> = MQTTClient_message_seed().copy {
								payload = ppmString.getPointer(memScope)
								payloadlen = ppmString.size
								qos = 1
								retained = 0
							}

							MQTTClient_publishMessage(client.value, "ppm", message, null)
						}
					}
				}
			}
		}
	}
}
