import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

/**
 * Generated class for the UserProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-product',
  templateUrl: 'user-product.html',
})
export class UserProductPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProductPage');
  }

  addAlert(){
    console.log('alert');
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
