import org.jetbrains.kotlin.gradle.plugin.KonanArtifactContainer

apply {
	plugin("konan")
}

configure<KonanArtifactContainer> {
	// https://github.com/eclipse/paho.mqtt.c
	interop("mqtt") {
		target("linux") {
			includeDirs("/usr/local/include")
		}
	}

	program("seaowl") {
		enableOptimizations(true)

		libraries {
			artifact("mqtt")
		}
	}
}
