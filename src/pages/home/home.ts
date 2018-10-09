import { Component } from '@angular/core';
<<<<<<< HEAD
import { NavController } from 'ionic-angular';
=======
import { NavController, LoadingController } from 'ionic-angular';
import { Http, RequestOptions, Headers, URLSearchParams } from '../../../node_modules/@angular/http';
import { GoogleAnalyticsService } from '../../app/sevices/analytics.service';
>>>>>>> production

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
<<<<<<< HEAD

  constructor(public navCtrl: NavController) {

=======
  weekNumber;
  worldPlan={};
  indiaPlan={};
  rsp={};
  greater: boolean = false;
  rgreater: boolean = false;
  ingreater: boolean = false;
  options;
  constructor(
    public navCtrl: NavController,
    private http:Http,
    private loadingCtrl:LoadingController,
    private gaService:GoogleAnalyticsService
    ) {
      this.options = new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      });
    this.weekNumber = this.getWeekNumber(new Date());
    this.fetchValues();
    this.gaService.gaTrackPageEnter('Home Page');
  }
  checkValues(world?,india?,rsp?) {
    if(world){
      this.greater = Number(world.Target) > Number(world.Actual);
    }
    if(india){
      this.ingreater = Number(india.Target) > Number(india.Actual);
    }
     if(rsp){
      this.rgreater = Number(rsp.Target) > Number(rsp.Actual);
    } 
    
  }
  getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((+d - +yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    return { year: d.getUTCFullYear(), weekNum: weekNo };
  }
  numberFormat(number) {
    let num = parseInt(number);
    if (num >= 1000000) {
      return Math.floor(num / 1000000).toString() + 'M';
    } else if (num >= 1000) {
      return Math.floor(num / 1000).toString() + 'K';
    } else
      return number;
  }
  fetchValues(){
    let load: any = this.loadingCtrl.create({
      spinner: "crescent",
      content: "Loading...",
      enableBackdropDismiss: true
    });
    load.present();
    let body = new URLSearchParams();
    body.set('action', 'GBDLoadPlans');
    body.set('planType', 'World Plan');
    let body2 = new URLSearchParams();
    body2.set('action', 'GBDLoadPlans');
    body2.set('planType', 'India Plan');
    let body3 = new URLSearchParams();
    body3.set('action', 'GBDLoadPlans');
    body3.set('planType', 'RSP');
    this.http.post('http://bt.the-v.net/service/api.aspx', body, this.options)
    .subscribe(world=>{
      this.worldPlan=world.json()[0];
      this.checkValues(world.json()[0]);
      this.http.post('http://bt.the-v.net/service/api.aspx', body2, this.options)
      .subscribe(india=>{
        this.indiaPlan=india.json()[0];
        this.checkValues(false,this.indiaPlan);
        this.http.post('http://bt.the-v.net/service/api.aspx', body3, this.options)
      .subscribe(rsp=>{
        this.rsp = rsp.json()[0];
        this.checkValues(false,false,this.rsp);
      },error=>{
        load.dismiss();
      },()=>{
        load.dismiss();
      })
      })
    })
>>>>>>> production
  }

}
