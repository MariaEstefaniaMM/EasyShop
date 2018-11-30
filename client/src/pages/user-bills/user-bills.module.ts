import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserBillsPage } from './user-bills';

@NgModule({
  declarations: [
    UserBillsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserBillsPage),
  ],
})
export class UserBillsPageModule {}
