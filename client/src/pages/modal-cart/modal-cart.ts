import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, MenuController } from 'ionic-angular';
import { UserProfilePage } from '../user-profile/user-profile';
import { UserProvider } from '../../providers/user/user';
import { ProductsPage } from '../products/products';
import { CartProvider } from '../../providers/cart/cart';
import { UserBillsPage } from '../user-bills/user-bills';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController,
    public userProvider: UserProvider, public cartProvider:CartProvider,public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalCartPage');
    this.menuCtrl.enable(true);
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  goToEditProfile(){
    this.navCtrl.push(UserProfilePage);
  }

  goToBill(){
    this.navCtrl.setRoot(UserBillsPage);
  }


}
