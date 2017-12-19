import {Component} from '@angular/core';

import seaOwlComponentTemplate from '../html/seaowl.html'

@Component({
	selector: 'seaowl',
	template: seaOwlComponentTemplate
})
export default class SeaOwlComponent {
	constructor() {
		this.co2 = 1200;
	}
}
