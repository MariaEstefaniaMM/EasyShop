import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditaccountPage } from '../editaccount/editaccount';

/**
 * Generated class for the UserAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-account',
  templateUrl: 'user-account.html',
})
export class UserAccountPage {

  private isDisabled: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToEditProfile(){
    this.navCtrl.push(EditaccountPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserAccountPage');
  }

}
