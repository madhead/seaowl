import 'zone.js';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import SeaOwlModule from './SeaOwlModule';

import '../less/seaowl.less';

platformBrowserDynamic().bootstrapModule(SeaOwlModule);
