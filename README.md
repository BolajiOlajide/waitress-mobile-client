# Waitress

The meal tracking app of Andela Lagos

## Waitress-mobile-client

This repository houses all code related to waitress-mobile-client

## Contribution

Calling all developers ![call](markdown_imgs/call.png)

All forms of contribution is welcome. Thank you for helping to make this project great!!!

Please view this [documentation](https://docs.google.com/a/andela.co/document/d/1xiDfPL-JTebwav6jdW30SzwwnDNZmajJVZhpU6h4kxg/edit?usp=sharing) over here, prepared just for you

## Setup

1. Install Xcode command line tool `xcode-select --install`
2. Install [homebrew](http://brew.sh/)

## Installation

### Node Setup

Install node with `brew install node` or visit the [website](https://nodejs.org/en/download/) to download

## App Setup

* Clone the repository

```bash
git clone git@github.com:waitress-andela/waitress-mobile-client.git
```

* Install ionic and cordova

```bash
npm install -g cordova ionic
```

* Navigate to the root of the repository

```bash
cd waitress-mobile-client
npm install
bower install
bower install ngCordova
```

* Startup the mobile client

```bash
ionic serve --lab
```

*Once you are done and you want to test on your device
Download android sdk tool [here](https://developer.android.com/studio/index.html)
run the following commands

```bash
export ANDROID_HOME=~/android-sdk-mac // this is dependent on where your app was downloaded and your OS
PATH=$PATH:$ANDROID_HOME/tools
PATH=$PATH:$ANDROID_HOME/platform-tools
cordova add platform android
android update sdk -u -a -t 19
android update sdk -u -a -t 20
Open the SDK manager by running: [your-download-folder]/android/tools/android
You will require:
1. "SDK Platform" for android-23
2. "Android SDK Platform-tools (latest)
3. "Android SDK Build-tools" (latest)
ionic state reset
ionic build android --device // make sure your device is connected
ionic run android --device
```

And you are all setup :)

### Run on an emulator

```bash
cordova run --emulator
```

### Build

```bash
cordova prepare && cordova compile
```

### JAVA HOME

Ensure you have JAVA JDK 1.8 installed and

```sh
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_201.jdk/Contents/Home
```
