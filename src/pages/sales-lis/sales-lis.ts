import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http, RequestOptions, Headers, URLSearchParams } from '../../../node_modules/@angular/http';
import { USER_DATA_KEY } from '../../app/app.constants';
import { Storage } from '../../../node_modules/@ionic/storage';
import { Subscription } from '../../../node_modules/rxjs/Subscription';
import { GoogleAnalyticsService } from '../../app/sevices/analytics.service';


/**
 * Generated class for the SalesLisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-sales-lis',
  templateUrl: 'sales-lis.html',
})
export class SalesLisPage {
  items: any[];
  options: RequestOptions;
  salesList = [];
  year;
  yrSelection: string[];
  wkSelection: string[];
  mrSelection: string[];
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
    this.gaService.gaTrackPageEnter('Sales List Page');
    this.contentLoad();
  }

  contentLoad() {
    let subs:Subscription;
    let load: any = this.loadingCtrl.create({
      spinner: "crescent",
      content: "Loading...",
      enableBackdropDismiss: true
    });
    load.onDidDismiss(() => {
      subs.unsubscribe();
    });
    load.present();
    this.storage.get(USER_DATA_KEY).then(user => {
      let body = new URLSearchParams();
      body.set('action', 'GBDReadSales');
      body.set('createdBy', user.EMail);
      subs = this.http.post('http://bt.the-v.net/service/api.aspx', body, this.options)
        .subscribe(res => {
          this.salesList = res.json();
          this.salesList.map(s => {
             s.week = " "+s.week+" ";
             s.yr = (new Date(s.CreatedOn)).getFullYear();
             return s;
          })
          var yrs = this.salesList.map(r => r.yr);
          var mark = this.salesList.map(r => r.marketcountry);
          var week = this.salesList.map(r => r.week);
          mark = mark.map(m=>{
            if(m.includes("(")){
             return m = m.slice(0, m.indexOf("("));
            }
            else{
              return m;
            }
          })
          this.yrSelection = yrs.filter((x, i, a) => x && a.indexOf(x) === i);
          this.mrSelection = mark.filter((x, i, a) => x && a.indexOf(x) === i);
          this.wkSelection = week.filter((x, i, a) => x && a.indexOf(x) === i);
          this.wkSelection.sort(this.compareNumbers);
          this.mrSelection.sort();
          //console.log(this.mrSelection);
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
  compareNumbers(a, b) {
    return b - a;
  }

}
