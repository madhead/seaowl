import Color from './Color';
import ColorStop from './ColorStop';

export const COLOR_STOPS = [
	new ColorStop(
		700,
		new Color(96, 166, 33),
		new Color(129, 209, 142)
	),
	new ColorStop(
		1200,
		new Color(195, 54, 99),
		new Color(237, 127, 68)
	),
].sort((a, b) => a.ppm - b.ppm);
