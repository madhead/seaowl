# seaowl

seaowl is a simple Kotlin Native demo application that reads CO₂ and temperature readings from devices like [this](https://www.co2meter.com/products/co2mini-co2-indoor-air-quality-monitor).

## How to use

    seaowl.kexe /dev/co2mini0

That's it.
Here, `/dev/co2mini0` is the CO2 mini device as seen by your OS.
Actually, it's a symlink for `/dev/hidrawX` created by this simple udev rule:

    ACTION=="remove", GOTO="co2mini_end"

    SUBSYSTEMS=="usb", KERNEL=="hidraw*", ATTRS{idVendor}=="04d9", ATTRS{idProduct}=="a052", MODE="0666", SYMLINK+="co2mini%n", GOTO="co2mini_end"

    LABEL="co2mini_end"

Mode is set to `666` to simplify your life, actually it's better to assign a user / group to the device.

## Acknowledgements

Many thanks to [Henryk Plötz](https://github.com/henryk) and his [Reverse-Engineering a low-cost USB CO₂ monitor](https://hackaday.io/project/5301/logs) article.
