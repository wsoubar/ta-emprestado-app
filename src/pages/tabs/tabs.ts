import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
@IonicPage()
export class TabsPage {

  homeRoot = 'HomePage'
  aboutRoot = 'AboutPage'


  constructor(public navCtrl: NavController) {}

}
