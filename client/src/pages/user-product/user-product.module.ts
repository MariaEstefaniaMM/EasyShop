import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProductPage } from './user-product';

@NgModule({
  declarations: [
    UserProductPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProductPage),
  ],
})
export class UserProductPageModule {}
