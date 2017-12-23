buildscript {
	repositories {
		jcenter()
		maven("https://dl.bintray.com/jetbrains/kotlin-native-dependencies")
	}

	dependencies {
		classpath("org.jetbrains.kotlin:kotlin-native-gradle-plugin:0.5")
	}
}

task<Wrapper>("wrapper") {
	gradleVersion = "4.4"
	distributionType = Wrapper.DistributionType.ALL
}
