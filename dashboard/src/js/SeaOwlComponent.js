import {Component} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import seaOwlComponentTemplate from '../html/seaowl.html'
import {COLOR_STOPS} from './config';

@Component({
	selector: 'seaowl',
	template: seaOwlComponentTemplate,
	host: {
		"[style.background-color]": "color('bg', this.co2)",
		"[style.color]": "color('fg', this.co2)"
	},
})
export default class SeaOwlComponent {
	ngOnInit() {
		this.co2 = COLOR_STOPS[0].ppm;
		Observable
			.timer(0, 50)
			.subscribe(t => {
				this.co2++;
				if (this.co2 > COLOR_STOPS[COLOR_STOPS.length - 1].ppm + 100) {
					this.co2 = COLOR_STOPS[0].ppm - 100
				}
			});
	}

	color(kind, ppm) {
		if (ppm <= COLOR_STOPS[0].ppm) {
			return COLOR_STOPS[0][kind].toRGB();
		} else if (ppm >= COLOR_STOPS[COLOR_STOPS.length - 1].ppm) {
			return COLOR_STOPS[COLOR_STOPS.length - 1][kind].toRGB();
		} else {
			let i = 0;

			while (i < COLOR_STOPS.length) {
				if (ppm > COLOR_STOPS[i].ppm) {
					i++
				} else {
					break
				}
			}

			return COLOR_STOPS[i - 1][kind].interpolate(
				COLOR_STOPS[i][kind],
				(ppm - COLOR_STOPS[i - 1].ppm) / (COLOR_STOPS[i].ppm - COLOR_STOPS[i - 1].ppm)
			).toRGB();
		}
	}
}
