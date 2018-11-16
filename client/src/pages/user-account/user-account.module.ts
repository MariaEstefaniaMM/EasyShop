import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserAccountPage } from './user-account';

@NgModule({
  declarations: [
    UserAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(UserAccountPage),
  ],
})
export class UserAccountPageModule {}
