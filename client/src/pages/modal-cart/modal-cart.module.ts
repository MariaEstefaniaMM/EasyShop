import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCartPage } from './modal-cart';

@NgModule({
  declarations: [
    ModalCartPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalCartPage),
  ],
})
export class ModalCartPageModule {}
