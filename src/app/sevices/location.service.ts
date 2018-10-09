import { Injectable } from "@angular/core";
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class LocationService {
    constructor(private geolocation: Geolocation) {
    }
    getCurrentLocation(): Promise<any> {
        return new Promise((resolve, reject)=>{
            this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
                resolve(resp.coords.longitude.toString() + ", " + resp.coords.latitude.toString());
            }).catch((error) => {
                reject ("Error!");
            });
        })
    }
}