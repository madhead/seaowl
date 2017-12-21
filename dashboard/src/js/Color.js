export default class Color {
	constructor(red, green, blue) {
		this.red = red;
		this.green = green;
		this.blue = blue;
	}

	interpolate(target, percent) {
		return new Color(
			(this.red + percent * (target.red - this.red)) | 0,
			(this.green + percent * (target.green - this.green)) | 0,
			(this.blue + percent * (target.blue - this.blue)) | 0
		)
	}

	toRGB() {
		return `rgb(${this.red}, ${this.green}, ${this.blue})`
	}
}
