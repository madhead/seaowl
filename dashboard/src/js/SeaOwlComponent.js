import {Component} from '@angular/core';
import {MqttService} from 'ngx-mqtt';

import seaOwlComponentTemplate from '../html/seaowl.html'
import {COLOR_STOPS} from './config';
import {MQTT_PPM_TOPIC} from './config';

@Component({
	selector: 'seaowl',
	template: seaOwlComponentTemplate,
	host: {
		"[style.background-color]": "bg(this.ppm)",
		"[style.color]": "fg(this.ppm)"
	},
})
export default class SeaOwlComponent {
	constructor(mqtt) {
		this.mqtt = mqtt;
	}

	ngOnInit() {
		this.ppm = 0;
		this.mqtt.observe(MQTT_PPM_TOPIC).subscribe(message => {
			this.ppm = parseInt(message.payload.toString())
		})
	}

	bg(ppm) {
		return this.color(ppm, colorStop => colorStop.bg)
	}

	fg(ppm) {
		return this.color(ppm, colorStop => colorStop.fg)
	}

	color(ppm, selector) {
		if (ppm <= COLOR_STOPS[0].ppm) {
			return selector(COLOR_STOPS[0]).toRGB();
		} else if (ppm >= COLOR_STOPS[COLOR_STOPS.length - 1].ppm) {
			return selector(COLOR_STOPS[COLOR_STOPS.length - 1]).toRGB();
		} else {
			let i = 0;

			while (i < COLOR_STOPS.length) {
				if (ppm > COLOR_STOPS[i].ppm) {
					i++
				} else {
					break
				}
			}

			return selector(COLOR_STOPS[i - 1]).interpolate(
				selector(COLOR_STOPS[i]),
				(ppm - COLOR_STOPS[i - 1].ppm) / (COLOR_STOPS[i].ppm - COLOR_STOPS[i - 1].ppm)
			).toRGB();
		}
	}
}

SeaOwlComponent.parameters = [
	MqttService
];
