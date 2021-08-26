# ![App Icon](https://github.com/RavenAcuzar/GBD-App/blob/master/resources/android/icon/drawable-xhdpi-icon.png) 
# Kamikaze Mobile App (For TheV GBD)

This is created for the members of the GBD of TheV.
In this app, you can monitor the target and the actual sales of each market. You can also submit your tasks and reports per assigned market country. See statistics of the target and actual values of World and India Plans, RSP, and the list of the top products per month.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Setup the following requirements to your local machine.

- [Node.js](https://nodejs.org/en/)
- [Setup Ionic](https://ionicframework.com/docs/intro/cli)
- [Setup Git](https://docs.github.com/en/get-started/quickstart/set-up-git)
- [IOS Development](https://ionicframework.com/docs/developing/ios)
- [Android Development](https://ionicframework.com/docs/developing/android)

### Initialize

Create ionic starter app.
```
ionic start GBDApp https://github.com/RavenAcuzar/GBD-App/
```
Initialize node packages (This is a very old project. Possible errors can be encountered with deprecated packages used.)
```
npm i
```
Run the app.
```
ionic serve
```
To add platform (Android/IOS)
```
ionic cordova platform add android
```
```
ionic cordova platform add ios
```

### Build App

Run the following commands for building the app.
(Android) For generating release apk add `--prod --release`
```
ionic cordova build android
```
(IOS) For generating release apk add `--prod`. Open project in XCode then run build, Archive, then upload to Appstore.
```
ionic cordova build ios
```


## Built with

* Ionic 3 (Ionic-Angular Framework)
* Typescript
* HTML, Css/Scss

## Authors

* **Rico Raven Acuzar** - [linkedin.com/in/rico-raven/](https://www.linkedin.com/in/rico-raven/)

