import { IonicPageModule } from 'ionic-angular';
import { EditItemPage } from './edit-item';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ EditItemPage ],
    imports: [ IonicPageModule.forChild(EditItemPage) ],
    exports: [ EditItemPage ]
})

export class EditItemModule {

}