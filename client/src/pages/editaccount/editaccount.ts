import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChangepassPage } from '../changepass/changepass';

/**
 * Generated class for the EditaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editaccount',
  templateUrl: 'editaccount.html',
})
export class EditaccountPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  changePass(){
    this.navCtrl.push(ChangepassPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditaccountPage');
  }

}
