import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewProductPage } from './new-product';

@NgModule({
  declarations: [
    NewProductPage,
  ],
  imports: [
    IonicPageModule.forChild(NewProductPage),
  ],
})
export class NewProductPageModule {}
