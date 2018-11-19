import { Component } from '@angular/core';
import { AlertController, ToastController, NavController } from 'ionic-angular';
import { UserProductsPage } from '../../pages/user-products/user-products';
import { UserProductPage } from '../../pages/user-product/user-product';

/**
 * Generated class for the ProductsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'products',
  templateUrl: 'products.html'
})
export class ProductsComponent {

  text: string;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public toastCtrl: ToastController) {
    console.log('Hello ProductsComponent Component');
    this.text = 'Hello World';
  }

  goToProduct(){
    this.navCtrl.push(UserProductPage);
  }

  addAlert(){
    const confirm = this.alertCtrl.create({
      title: 'how many products?',
      inputs: [
        {
          name: 'Quantity:',
          placeholder: '1',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'CANCEL',
          handler: ()=>{
            console.log('CANCEL');
          }
        },
        {
          text: 'ADD TO WISHLIST',
          handler: ()=>{
            this.addToast();
            console.log('added')
          }
        }
      ]
    });
    confirm.present();
  }

  addToast(){
    let toast = this.toastCtrl.create({
      message: 'Added!',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() =>{
      console.log('dissmissed toast');
    });
    toast.present();
  }

}
