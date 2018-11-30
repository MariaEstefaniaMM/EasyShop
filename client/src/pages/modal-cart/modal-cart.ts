import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserProfilePage } from '../user-profile/user-profile';

/**
 * Generated class for the ModalCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-cart',
  templateUrl: 'modal-cart.html',
})
export class ModalCartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalCartPage');
  }

  closeModal(){
    this.viewCtrl.dismiss()
  }

  goToEditProfile(){
    this.navCtrl.push(UserProfilePage);
  }

}
