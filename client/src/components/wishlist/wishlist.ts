import { Component } from '@angular/core';
import { AlertController, ToastController, NavController } from 'ionic-angular';
import { UserProductsPage } from '../../pages/user-products/user-products';
import { UserProductPage } from '../../pages/user-product/user-product';

/**
 * Generated class for the WishlistComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'wishlist',
  templateUrl: 'wishlist.html'
})
export class WishlistComponent {

  text: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    console.log('Hello WishlistComponent Component');
    this.text = 'Hello World';
  }

  goToProduct(){
    this.navCtrl.push(UserProductPage);
  }

  shopProduct(){
    console.log('shop');
  }
  
  deleteProduct(){
    let alert = this.alertCtrl.create({
      title: 'Do you want delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: data =>{
            console.log('cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: data =>{
            console.log('cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
