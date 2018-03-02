import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {MqttService} from 'ngx-mqtt';

import SeaOwlComponent from './SeaOwlComponent';
import {MQTT_SERVICE_OPTIONS} from './config';

export function mqttServiceFactory() {
	return new MqttService(MQTT_SERVICE_OPTIONS);
}

@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot(
			[
			]
		)
	],
	declarations: [
		SeaOwlComponent
	],
	providers: [
		{
			provide: MqttService,
			useFactory: mqttServiceFactory,
		}
	],
	bootstrap: [SeaOwlComponent]
})
export default class SeaOwlModule {
}
