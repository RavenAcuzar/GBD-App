import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '../../../node_modules/@ionic/storage';
import { Http, RequestOptions, Headers, URLSearchParams } from '../../../node_modules/@angular/http';
import { USER_DATA_KEY } from '../../app/app.constants';
import { GoogleAnalyticsService } from '../../app/sevices/analytics.service';

/**
 * Generated class for the TaskListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {
  options: RequestOptions;
  taskList=[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http:Http,
    private storage:Storage,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private gaService:GoogleAnalyticsService) {
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    this.contentLoad();
    this.gaService.gaTrackPageEnter('My Task List Page');
  }

  contentLoad() {
    let load: any = this.loadingCtrl.create({
      spinner: "crescent",
      content: "Loading...",
      enableBackdropDismiss: true
    });
    load.present();
    this.storage.get(USER_DATA_KEY).then(user=>{
      let body = new URLSearchParams();
    body.set('action', 'GBDReadTask');
    body.set('createdBy',user.EMail);
      this.http.post('http://bt.the-v.net/service/api.aspx', body, this.options)
      .subscribe(res=>{
        this.taskList = res.json();
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
