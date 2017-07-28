import { ItemProvider } from './../../providers/item/item';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    userProfile: any;
    $items: any;

    constructor(public navCtrl: NavController, private storage: Storage, private itemProvider: ItemProvider) {
        /*
        this.storage.get('userProfile').then(profile => {
            console.log('get>>> ' + profile);
            this.userProfile = JSON.parse(profile); 
            //console.log('userProfile >>>>>' + JSON.stringify(this.userProfile));
        });
          */

        itemProvider.listItems()
            //.do(console.log)
            .subscribe(items => {
                this.$items = items;
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }

}
