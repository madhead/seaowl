import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import SeaOwlComponent from './SeaOwlComponent';

@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [
		SeaOwlComponent
	],
	bootstrap: [SeaOwlComponent]
})
export default class SeaOwlModule {
}
