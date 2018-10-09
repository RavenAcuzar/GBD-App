import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '../../../node_modules/@ionic/storage';
import { LocationService } from '../../app/sevices/location.service';
import { AppService } from '../../app/sevices/app.service';
import { Http, RequestOptions, Headers, URLSearchParams } from '../../../node_modules/@angular/http';
import { USER_DATA_KEY } from '../../app/app.constants';
import { GoogleAnalyticsService } from '../../app/sevices/analytics.service';

/**
 * Generated class for the ToDoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-to-do',
  templateUrl: 'to-do.html',
})
export class ToDoPage {
  marketSelection = [];
  title = '';
  desc = '';
  marketCntry = '';
  repStatus = false;
  status;
  email;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private http: Http,
    private appSvc: AppService, 
    private locSvc: LocationService, 
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController, 
    private storage: Storage,
    private gaService:GoogleAnalyticsService) {
      this.loadSelections();
      this.gaService.gaTrackPageEnter('Add Report Page');
  }
  loadSelections() {
    this.storage.get(USER_DATA_KEY).then(detail=>{
      this.email = detail.EMail;
    let body = new URLSearchParams();
    body.set('action', 'GBDLoadMarketSelection');
    body.set('username', this.email)
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });

    this.http.post('http://bt.the-v.net/service/api.aspx', body, options)
      .subscribe(res => {
        this.marketSelection = res.json();
        console.log(this.marketSelection);
      });
    });
  }
  submitReport() {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Submitting Report...'
    });
    loading.present();
    if (this.repStatus) {
      this.status = "DONE";
    }
    else {
      this.status = "NEW";
    }
    this.locSvc.getCurrentLocation().then(coords => {
      console.log(coords);
      if (this.appSvc.checkForm({
        marketCountry: this.marketCntry,
        title: this.title,
        description: this.desc
      })) {
        if (coords != "Error!") {
          this.appSvc.createReport({
            marketCountry: this.marketCntry,
            title: this.title,
            description: this.desc,
            status: this.status,
            location: coords,
          }, loading);
          this.marketCntry = '';
          this.title = '';
          this.desc = '';
          this.repStatus = false;
        }
        else {
          let alert = this.alertCtrl.create({
            title: "Report Not submitted!",
            message: "Error getting device location. Please make sure you're connected to the internet, and the device location is turned on.",
            buttons: [
              {
                text: 'OK',
                role: 'cancel',
                handler: () => {
                }
              }
            ]
          });
          loading.dismiss();
          alert.present();
        }
      }
      else {
        let youralert = this.alertCtrl.create({
          title: "Please Fill the required fields!",
          message: `<ul>
                      <li>Market Country</li> 
                      <li>Title</li> 
                      <li>Description</li>
                  </ul>`,
          buttons: [
            {
              text: 'OK',
              role: 'cancel',
              handler: () => {
              }
            }
          ]
        });
        loading.dismissAll();
        youralert.present();
      }
    }).catch(()=>{
      let alert = this.alertCtrl.create({
        title: "Report Not submitted!",
        message: "Error getting device location.",
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      loading.dismissAll();
      alert.present(); 
    });
  }

}
