import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MqttService} from 'ngx-mqtt';

import seaOwlComponentTemplate from '../html/seaowl.html'
import {COLOR_STOPS} from './config';

@Component({
	selector: 'seaowl',
	template: seaOwlComponentTemplate,
	host: {
		'[style.background-color]': 'bg(this.ppm)',
		'[style.color]': 'fg(this.ppm)'
	},
})
export default class SeaOwlComponent {
	constructor(mqtt, route) {
		this.mqtt = mqtt;
		this.ppm = 0;
		route.fragment.subscribe(fragment => {
			let topic = (fragment || '').replace('/', '');

			if (topic){
				if (!!this.ppmSubscription) {
					this.ppmSubscription.unsubscribe();
				}

				this.ppm = 0;
				this.ppmSubscription = this.mqtt.observe(topic).subscribe(message => {
					this.ppm = parseInt(message.payload.toString())
				});
			}
		});
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
	MqttService,
	ActivatedRoute
];
