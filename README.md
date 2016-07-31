# Waitress
_The meal tracking app of Andela Lagos_

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
```
git clone git@github.com:waitress-andela/waitress-mobile-client.git
```
* Install ionic and cordova
```
npm install -g cordova ionic
```
* Navigate to the root of the repository
```
cd waitress-mobile-client
npm install
bower install
bower install ngCordova
```
* Startup the mobile client
```
ionic serve --lab
```
*Once you are done and you want to test on your device
Download android sdk tool from https://developer.android.com/studio/index.html
run the following commands

```
export ANDROID_HOME=~/android-sdk-mac // this is dependent on where your app was downloaded and your OS
PATH=$PATH:$ANDROID_HOME/tools
PATH=$PATH:$ANDROID_HOME/platform-tools   
cordova add platform android
ionic build android --device make sure your device is connected
```

And you are all setup :)
