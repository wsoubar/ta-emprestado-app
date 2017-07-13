import { AboutPage } from './about';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [AboutPage],
    imports: [
        IonicPageModule.forChild(AboutPage)
    ],
    exports: [AboutPage]
}) 

export class AboutPageModule {

}