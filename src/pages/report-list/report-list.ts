import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Storage } from '../../../node_modules/@ionic/storage';
import { USER_DATA_KEY } from '../../app/app.constants';
import { GoogleAnalyticsService } from '../../app/sevices/analytics.service';

/**
 * Generated class for the ReportListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-report-list',
  templateUrl: 'report-list.html',
})
export class ReportListPage {
  options: RequestOptions;
  reportList = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private gaService:GoogleAnalyticsService) {
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    this.contentLoad();
    this.gaService.gaTrackPageEnter('My Reports List Page');
  }

  contentLoad() {
    let load: any = this.loadingCtrl.create({
      spinner: "crescent",
      content: "Loading...",
      enableBackdropDismiss: true
    });
    load.present();
    this.storage.get(USER_DATA_KEY).then(user => {
      let body = new URLSearchParams();
      body.set('action', 'GBDReadReport');
      body.set('createdBy', user.EMail);
      this.http.post('http://bt.the-v.net/service/api.aspx', body, this.options)
        .subscribe(res => {
          this.reportList = res.json();
        },
          error => {
            load.dismiss();
            let youralert = this.alertCtrl.create({
              title: "Network Connection Error!",
              message: "Please make sure you are connected to the internet.",
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
          },
          () => {
            load.dismiss();
          })
    })
  }

}
