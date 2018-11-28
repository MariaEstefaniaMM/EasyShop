import { CartProvider } from './../../providers/cart/cart';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Events, Select } from 'ionic-angular';

/**
 * Generated class for the WishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {

  wishlist:boolean=true;

  cart={
    amount:null,
    payment_mode:"",
  }

  @ViewChild('mySelect') selectRef: Select;
  constructor(public navCtrl: NavController, public navParams: NavParams, public cartProvider:CartProvider,
              public alertCtrl: AlertController, public toastCtrl: ToastController, public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WishlistPage');
  }

  openSelect(){
    this.selectRef.open();
  }

  shopProduct(){
    this.cartProvider.shop(this.cart).subscribe((res:any) => {
      console.log('purchase');
        if (res.status==200){
          console.log(res);
          this.cartProvider.productsFromCart[this.cartProvider.productsFromCart.indexOf(this.cart),1].id_bill=res.id_bill;
          this.toast(res.message);
      }else{
        this.errorAlert(res.message);
      }
      }, (err) => {
        this.errorAlert(JSON.stringify(err));         
      }
      );
  }

  errorAlert(message){
    (this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    })).present();  
  }

  toast(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() =>{
      console.log('dissmissed toast');
    });
    toast.present();
  }

}
