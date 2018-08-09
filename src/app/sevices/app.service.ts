import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { Storage } from '@ionic/storage';
import { USER_DATA_KEY } from "../app.constants";
import { AlertController, LoadingController } from "ionic-angular";
import { GoogleAnalyticsService } from "./analytics.service";

export type TaskDetails = {
    marketCountry: string,
    title: string,
    description: string,
    status: string,
    revision: string,
    location: string
};
export type ReportDetails = {
    marketCountry: string,
    title: string,
    description: string,
    status: string,
    location: string
};
@Injectable()
export class AppService {

    private CreatedBy:string;
    private options;
    constructor(private storage: Storage, private http: Http, private alertCtrl:AlertController,
    private loadingCtrl:LoadingController, private gaSvc:GoogleAnalyticsService) {
        this.storage.get(USER_DATA_KEY).then(detail=>{
            this.CreatedBy = detail.EMail;
        });
        this.options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        });
    }

    createTask(details: TaskDetails, loading) {
        let body = new URLSearchParams();
        body.set('action', 'GBDAddTask');
        body.set('createdBy', this.CreatedBy);
        body.set('marketCountry', details.marketCountry);
        body.set('name', details.title);
        body.set('content', details.description);
        body.set('status', details.status);
        body.set('revision', details.revision);
        body.set('location', details.location);

        this.http
            .post('http://bt.the-v.net/service/api.aspx', body, this.options)
            .subscribe(res => {
                let sentDetails = res.text();
                if(sentDetails == "True" ){
                    let youralert = this.alertCtrl.create({
                        title: "Task Submitted!",
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
                else{
                    let youralert = this.alertCtrl.create({
                        title: "Error Submitting Task!",
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
            }, error =>{
                let youralert = this.alertCtrl.create({
                    title: "Error Submitting Task!",
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
            },
        ()=>{
            loading.dismissAll();
            this.gaSvc.gaEventTracker('Task','Submit Task','Task submitted by user');
        });
    }
    createReport(details: ReportDetails, loading) {
        let body = new URLSearchParams();
        body.set('action', 'GBDAddReport');
        body.set('createdBy', this.CreatedBy);
        body.set('marketCountry', details.marketCountry);
        body.set('name', details.title);
        body.set('content', details.description);
        body.set('status', details.status);
        body.set('location', details.location);

        this.http.post('http://bt.the-v.net/service/api.aspx', body, this.options)
            .subscribe(res => {
                let sentDetails = res.text();
                if(sentDetails == "True"){
                    let youralert = this.alertCtrl.create({
                        title: "Report Submitted!",
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
                else{
                    let youralert = this.alertCtrl.create({
                        title: "Error Submitting Report!",
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
            }, error =>{
                let youralert = this.alertCtrl.create({
                    title: "Error Submitting Report!",
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
            },
        ()=>{
            loading.dismissAll();
            this.gaSvc.gaEventTracker('Report','Submit Report','Report submitted by user');
        });
    }
    getTaskList(){
        let body = new URLSearchParams();
        body.set('action', 'GBDReadTask');
        body.set('createdBy', this.CreatedBy);

        this.http.post('http://bt.the-v.net/service/api.aspx', body, this.options)
            .subscribe(res => {
                return res.json();
            }, error =>{
                let youralert = this.alertCtrl.create({
                    title: "Error Loading Task List!",
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
        ()=>{

        });
    }
    getReportList(){
        let body = new URLSearchParams();
        body.set('action', 'GBDReadReport');
        body.set('createdBy', this.CreatedBy);

        this.http.post('http://bt.the-v.net/service/api.aspx', body, this.options)
            .subscribe(res => {
                return res.json();
            }, error =>{
                let youralert = this.alertCtrl.create({
                    title: "Error Loading Report List!",
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
        ()=>{
        });
    }
    checkForm(details):any{
        if(details.marketCountry==''||details.title==''||details.description==''){
            return false;
        } else {
            return true;
        }
    }
}