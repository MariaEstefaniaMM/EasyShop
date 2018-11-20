import { Product } from './../../models/product';
import { Component, Input } from '@angular/core';
import { AlertController, ToastController, NavController } from 'ionic-angular';
import { UserProductPage } from '../../pages/user-product/user-product';

@Component({
  selector: 'products',
  templateUrl: 'products.html'
})
export class ProductsComponent {

  text: string;
  @Input() product: Product;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public toastCtrl: ToastController) {
    console.log('Hello ProductsComponent Component');
    this.text = 'Hello World';
  }

  goToProduct(product){
    this.navCtrl.push(UserProductPage, product);
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
