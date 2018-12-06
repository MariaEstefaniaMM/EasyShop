import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, MenuController } from 'ionic-angular';
import { UserProfilePage } from '../user-profile/user-profile';
import { UserProvider } from '../../providers/user/user';
import { ProductsPage } from '../products/products';
import { CartProvider } from '../../providers/cart/cart';
import { UserBillsPage } from '../user-bills/user-bills';

@IonicPage()
@Component({
  selector: 'page-modal-cart',
  templateUrl: 'modal-cart.html',
})
export class ModalCartPage {

  data = this.navParams.get('data');

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController,
    public userProvider: UserProvider, public cartProvider:CartProvider,public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalCartPage');
    this.menuCtrl.enable(true);
    this.data;
    console.log(this.data)
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  goToEditProfile(){
    this.navCtrl.push(UserProfilePage);
  }

  goToBills(){
    this.navCtrl.push(UserBillsPage);
  }

  goToProducts(){
    this.navCtrl.setRoot(ProductsPage)
  }


}
