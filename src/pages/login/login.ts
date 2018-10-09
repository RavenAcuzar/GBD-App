import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AppStateService } from '../../app/sevices/app_state.service';
import { USER_DATA_KEY, IS_LOGGED_IN_KEY } from '../../app/app.constants';
import { RequestOptions, Http, Headers, URLSearchParams } from '../../../node_modules/@angular/http';
import { Storage } from '../../../node_modules/@ionic/storage';
import { GoogleAnalyticsService } from '../../app/sevices/analytics.service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email = '';
  pass = '';
  APIurl = "http://bt.the-v.net/service/api.aspx";
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    private http: Http, private storage: Storage, private event: Events, private loadingCtrl:LoadingController, private gaService:GoogleAnalyticsService) {
  }

  ionViewDidLoad() {
    this.gaService.gaTrackPageEnter('Login Page');
  }
  loginBtnClicked() {
    let body = new URLSearchParams();
    body.set('action', 'GBDCheckLogin');
    body.set('username', this.email);
    body.set('password', this.pass);
    let body2 = new URLSearchParams();
    body2.set('action', 'GBDGetUserLogin');
    body2.set('username', this.email);
    body2.set('password', this.pass);
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    let load: any = this.loadingCtrl.create({
      spinner: "crescent",
      content: "Logging in...",
      enableBackdropDismiss: true
    });
    load.present();
    this.http.post(this.APIurl, body, options)
      .subscribe(ValidateLogin => {
        console.log(ValidateLogin.text());
        if (ValidateLogin.text() == "True") {
          this.gaService.gaEventTracker('App Access','Log in','User Logged In');
          this.storage.set(IS_LOGGED_IN_KEY, true).then(() => {
            return this.http.post(this.APIurl, body2, options)
              .subscribe(userCred => {
                let userArray = userCred.json();
                this.storage.set(USER_DATA_KEY, userArray[0]).then(() => {
                  AppStateService.publishAppStateChange(this.event);
                  load.dismiss();
                })
              })
          });
          this.navCtrl.setRoot(HomePage);
        }
        else {
          load.dismiss();
          let youralert = this.alertCtrl.create({
            title: "Invalid Login!",
            buttons: [
              {
                text: 'OK',
                role: 'cancel',
                handler: () => {
                }
              }
            ]
          });
          youralert.present();
        }
      },error=>{
        load.dismiss();
        let youralert = this.alertCtrl.create({
          title: "Something went wrong!",
          message:"An error occured while trying to login. Please try again.",
          buttons: [
            {
              text: 'OK',
              role: 'cancel',
              handler: () => {
              }
            }
          ]
        });
        youralert.present();
      });
  }

}
