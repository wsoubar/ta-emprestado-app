import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  
  userProfile : any;

  constructor(public navCtrl: NavController, private storage: Storage) {
    /*
    this.storage.get('userProfile').then(profile => {
        console.log('get>>> ' + profile);
        this.userProfile = JSON.parse(profile); 
        //console.log('userProfile >>>>>' + JSON.stringify(this.userProfile));
    });
      */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
