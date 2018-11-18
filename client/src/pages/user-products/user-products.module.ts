import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProductsPage } from './user-products';

@NgModule({
  declarations: [
    UserProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProductsPage),
  ],
})
export class UserProductsPageModule {}
