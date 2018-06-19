buildscript {
	repositories {
		jcenter()
		maven("https://dl.bintray.com/jetbrains/kotlin-native-dependencies")
	}

	dependencies {
		classpath("org.jetbrains.kotlin:kotlin-native-gradle-plugin:0.7.1")
	}
}

task<Wrapper>("wrapper") {
	gradleVersion = "4.7"
	distributionType = Wrapper.DistributionType.ALL
}
