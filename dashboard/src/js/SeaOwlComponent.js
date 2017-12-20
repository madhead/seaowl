import {Component} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import seaOwlComponentTemplate from '../html/seaowl.html'

const CO2_GREEN_PPM = 700
const CO2_GREEN_COLOR = [129, 209, 142]
const CO2_GREEN_BACKGROUND_COLOR = [96, 166, 33]
const CO2_RED_PPM = 1200
const CO2_RED_COLOR = [237, 127, 68]
const CO2_RED_BACKGROUND_COLOR = [195, 54, 99]

@Component({
	selector: 'seaowl',
	template: seaOwlComponentTemplate,
	host: {
    "[style.background-color]":"backgroundColor(this.co2)",
    "[style.color]":"color(this.co2)"
  },
})
export default class SeaOwlComponent {
	ngOnInit() {
		this.co2 = CO2_GREEN_PPM;
		Observable
			.timer(0,50)
			.subscribe(t => {
				this.co2++;
				if(this.co2 > CO2_RED_PPM + 100){
					this.co2 = CO2_GREEN_PPM - 100
				}
			});
	}

	backgroundColor(ppm) {
		if(ppm <= CO2_GREEN_PPM){
			return `rgb(${CO2_GREEN_BACKGROUND_COLOR[0]}, ${CO2_GREEN_BACKGROUND_COLOR[1]}, ${CO2_GREEN_BACKGROUND_COLOR[2]})`
		} else if (ppm >= CO2_RED_PPM) {
			return `rgb(${CO2_RED_BACKGROUND_COLOR[0]}, ${CO2_RED_BACKGROUND_COLOR[1]}, ${CO2_RED_BACKGROUND_COLOR[2]})`
		} else {
			let standing = (ppm - CO2_GREEN_PPM) / (CO2_RED_PPM - CO2_GREEN_PPM)
			return `rgb(${Math.round(CO2_GREEN_BACKGROUND_COLOR[0] + standing * (CO2_RED_BACKGROUND_COLOR[0] - CO2_GREEN_BACKGROUND_COLOR[0]))}, ${Math.round(CO2_GREEN_BACKGROUND_COLOR[1] + standing * (CO2_RED_BACKGROUND_COLOR[1] - CO2_GREEN_BACKGROUND_COLOR[1]))}, ${Math.round(CO2_GREEN_BACKGROUND_COLOR[2] + standing * (CO2_RED_BACKGROUND_COLOR[2] - CO2_GREEN_BACKGROUND_COLOR[2]))})`
		}
	}

	color(ppm){
		if(ppm <= CO2_GREEN_PPM){
			return `rgb(${CO2_GREEN_COLOR[0]}, ${CO2_GREEN_COLOR[1]}, ${CO2_GREEN_COLOR[2]})`
		} else if (ppm >= CO2_RED_PPM) {
			return `rgb(${CO2_RED_COLOR[0]}, ${CO2_RED_COLOR[1]}, ${CO2_RED_COLOR[2]})`
		} else {
			let standing = (ppm - CO2_GREEN_PPM) / (CO2_RED_PPM - CO2_GREEN_PPM)
			return `rgb(${Math.round(CO2_GREEN_COLOR[0] + standing * (CO2_RED_COLOR[0] - CO2_GREEN_COLOR[0]))}, ${Math.round(CO2_GREEN_COLOR[1] + standing * (CO2_RED_COLOR[1] - CO2_GREEN_COLOR[1]))}, ${Math.round(CO2_GREEN_COLOR[2] + standing * (CO2_RED_COLOR[2] - CO2_GREEN_COLOR[2]))})`
		}
	}
}
