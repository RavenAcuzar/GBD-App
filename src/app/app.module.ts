<<<<<<< HEAD
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
=======
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injectable, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AddTaskPage } from '../pages/add-task/add-task';
import { LoginPage } from '../pages/login/login';
import { ReportListPage } from '../pages/report-list/report-list';
import { SalesLisPage } from '../pages/sales-lis/sales-lis';
import { TaskListPage } from '../pages/task-list/task-list';
import { ToDoPage } from '../pages/to-do/to-do';
import { TopProductsPage } from '../pages/top-products/top-products';
import { HttpModule } from '../../node_modules/@angular/http';
import { IonicStorageModule } from '../../node_modules/@ionic/storage';
import { AppService } from './sevices/app.service';
import { LocationService } from './sevices/location.service';
import { YearFilterPipe } from './provider/filter.pipe';
import { GoogleAnalytics } from '../../node_modules/@ionic-native/google-analytics';
import { GoogleAnalyticsService } from './sevices/analytics.service';
import { Pro } from '@ionic/pro';


Pro.init('d996c38e', {
  appVersion: '1.1.2'
})

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}
>>>>>>> production

@NgModule({
  declarations: [
    MyApp,
<<<<<<< HEAD
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
=======
    HomePage,
    AddTaskPage,
    LoginPage,
    ReportListPage,
    SalesLisPage,
    TaskListPage,
    ToDoPage,
    TopProductsPage,
    YearFilterPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
>>>>>>> production
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
<<<<<<< HEAD
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
=======
    HomePage,
    AddTaskPage,
    LoginPage,
    ReportListPage,
    SalesLisPage,
    TaskListPage,
    ToDoPage,
    TopProductsPage
>>>>>>> production
  ],
  providers: [
    StatusBar,
    SplashScreen,
<<<<<<< HEAD
    {provide: ErrorHandler, useClass: IonicErrorHandler}
=======
    Geolocation,
    AppService,
    LocationService,
    GoogleAnalytics,
    GoogleAnalyticsService,
    IonicErrorHandler,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: ErrorHandler, useClass: MyErrorHandler}
>>>>>>> production
  ]
})
export class AppModule {}
