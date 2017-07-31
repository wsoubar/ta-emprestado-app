import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AppMessagesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AppMessagesProvider {

    constructor(public http: Http, public alertCtrl: AlertController) {
        console.log('Hello AppMessagesProvider Provider');
    }

    alert(info: any) {
        let alert = this.alertCtrl.create({
            subTitle: info.message,
            buttons: ['OK']
        });
        alert.present();        
    }

}
