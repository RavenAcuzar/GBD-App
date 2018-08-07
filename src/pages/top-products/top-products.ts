import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { GoogleAnalyticsService } from '../../app/sevices/analytics.service';

/**
 * Generated class for the TopProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-top-products',
  templateUrl: 'top-products.html',
})
export class TopProductsPage {
  options: RequestOptions;
  topProducts = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private http:Http,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private gaService:GoogleAnalyticsService) {
      this.options = new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      });
      this.contentLoad();
      this.gaService.gaTrackPageEnter('Top Products Page');
  }
  contentLoad(){
    let load: any = this.loadingCtrl.create({
      spinner: "crescent",
      content: "Loading...",
      enableBackdropDismiss: true
    });
    load.present();
    let body = new URLSearchParams();
    body.set('action', 'GBDGetTopProducts');
      this.http.post('http://bt.the-v.net/service/api.aspx', body, this.options)
      .subscribe(res=>{
        this.topProducts = res.json();
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
  }
  hideSublist(id){
    if(document.getElementById(id).style.display === "none")
    {
      document.getElementById(id).style.display="block";
    }
    else{
      document.getElementById(id).style.display="none";
    }
    //console.log(document.getElementById(id).style.display);
  }

}
