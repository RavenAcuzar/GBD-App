import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Storage } from '../../node_modules/@ionic/storage';
import { AppStateService } from './sevices/app_state.service';
import { IS_LOGGED_IN_KEY, USER_DATA_KEY } from './app.constants';
import { LoginPage } from '../pages/login/login';
import { ToDoPage } from '../pages/to-do/to-do';
import { AddTaskPage } from '../pages/add-task/add-task';
import { TaskListPage } from '../pages/task-list/task-list';
import { ReportListPage } from '../pages/report-list/report-list';
import { SalesLisPage } from '../pages/sales-lis/sales-lis';
import { TopProductsPage } from '../pages/top-products/top-products';
import { GoogleAnalyticsService } from './sevices/analytics.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{icon:string, title: string, component: any}>;
  username = '';
  email = '';

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private storage: Storage, private events: Events, private alertCtrl: AlertController, private gaService:GoogleAnalyticsService) {
    this.initializeApp();
    this.events.subscribe(AppStateService.UPDATE_MENU_STATE_EVENT, _ => {
      this.changeSidemenuUserDetail();
    })
    // used for an example of ngFor and navigation
    this.pages = [
      { icon: "md-home",title: 'Home', component: HomePage },
      { icon: "md-flash", title: 'Add Report', component: ToDoPage },
      { icon: "md-list", title: 'Reports List', component: ReportListPage },
      { icon: "md-checkbox-outline", title: 'Add Task', component: AddTaskPage },
      { icon: "md-list-box", title: 'Task List', component: TaskListPage },
      { icon: "md-pie", title: 'Sales List', component: SalesLisPage },
      { icon: "md-analytics", title: 'Top Products', component: TopProductsPage }
    ];

  }
  changeSidemenuUserDetail() {
    this.storage.get(USER_DATA_KEY).then(userData => {
      if (userData != null) {
        this.username = userData.FullName;
        this.email = userData.EMail; 
      }
    })
  }
  Logout() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure you want to Log out?',
      buttons: [{
        text: 'Logout',
        handler: () => {
          console.log('Logout clicked');
          this.storage.set(IS_LOGGED_IN_KEY, false).then(() => {
            return this.storage.set(USER_DATA_KEY, null).then(() => {
              AppStateService.publishAppStateChange(this.events);
              this.gaService.gaEventTracker('App Access','Log out','User Logged Out');
              this.nav.setRoot(LoginPage);
            })
          }).catch();
          alert.dismiss();
          return false;
        }
      },
      {
        text: 'Cancel',
        handler: () => {
          console.log('Cancel clicked');
          alert.dismiss();
          return false;
        }
      }
      ]
    })
    alert.present();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get(IS_LOGGED_IN_KEY).then(isLoggedIn => {
        if (isLoggedIn) {
          this.rootPage = HomePage;
          this.storage.get(USER_DATA_KEY).then(userData => {
            this.username = userData.FullName;
            this.email = userData.EMail;
          })
        }
        else {
          this.rootPage = LoginPage;
        }
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
