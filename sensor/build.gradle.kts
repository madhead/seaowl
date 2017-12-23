import org.jetbrains.kotlin.gradle.plugin.KonanArtifactContainer

buildscript {
	repositories {
		jcenter()
		maven("https://dl.bintray.com/jetbrains/kotlin-native-dependencies")
	}

	dependencies {
		classpath("org.jetbrains.kotlin:kotlin-native-gradle-plugin:0.5")
	}
}

apply {
	plugin("konan")
}

configure<KonanArtifactContainer> {
	// https://github.com/eclipse/paho.mqtt.c
	interop("mqtt") {
		target("linux") {
			includeDirs("/usr/local/include")
		}
	}

	program("seaowl") {
		enableOptimizations(true)

		libraries {
			artifact("mqtt")
		}
	}
}

task<Wrapper>("wrapper") {
	gradleVersion = "4.4"
	distributionType = Wrapper.DistributionType.ALL
}
