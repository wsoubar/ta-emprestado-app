import { Item } from './../../shared/model/item';
import { Observable } from 'rxjs/Observable';
import { ItemProvider } from './../../providers/item/item';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
// import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    userProfile: any;
    items$: Observable<Item[]>;

    constructor(public navCtrl: NavController, private itemProvider: ItemProvider, private alertCtrl: AlertController) {
        /*

        private storage: Storage,  

        this.storage.get('userProfile').then(profile => {
            console.log('get>>> ' + profile);
            this.userProfile = JSON.parse(profile); 
            //console.log('userProfile >>>>>' + JSON.stringify(this.userProfile));
        });
          */

        this.items$ = itemProvider.listItems();
        this.items$.subscribe(console.log);
    }

    removeItem(item: any) {
        console.log(item);
        this.itemProvider.removeItem(item).subscribe(data=>{
            console.log('removido com sucesso.')
            this.alert('Item removido com sucesso');
        }, error => {
            console.error('Erro: ', error);
        });
    }

    alert(message: string) {
        let alert = this.alertCtrl.create({
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }

}
