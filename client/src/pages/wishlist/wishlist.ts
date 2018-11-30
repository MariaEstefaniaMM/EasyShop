import { CartProvider } from './../../providers/cart/cart';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Events, Select, ModalController, ModalOptions } from 'ionic-angular';

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
  productsFromCart;
  cart={
    amount:null,
    payment_mode:"",
  }
  bill;

  @ViewChild('mySelect') selectRef: Select;
  constructor(public navCtrl: NavController, public navParams: NavParams, public cartProvider:CartProvider,
              public alertCtrl: AlertController, public toastCtrl: ToastController, public events: Events,
              public modalCtrl: ModalController) {
                console.log(navParams.data)
                if(navParams.data[0]){
                this.bill=true
                this.productsFromCart=navParams.data;
                this.cart.amount=this.productsFromCart[0].amount
                console.log(this.bill);}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WishlistPage');
    if (!this.bill){
    this.productsFromCart=this.cartProvider.productsFromCart.filter((product:any)=>{return product.id_bill===null})
    } 
    console.log(this.cartProvider.productsFromCart, this.productsFromCart);
    console.log(this.bill);

  }

  openModal(){  
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    }

    const modalCart = this.modalCtrl.create('ModalCartPage', myModalOptions);
    modalCart.present();
  }

  openSelect(){
    this.selectRef.open();
  }

  shopProduct(){
    this.cartProvider.shop(this.cart).subscribe((res:any) => {
      console.log('purchase');
        if (res.status==200){
          this.openModal();
          console.log(res);
          //this.cartProvider.productsFromCart[this.cartProvider.productsFromCart.indexOf(this.cart)].id_bill=res.id_bill;
          this.cartProvider.getUserCart();
         // console.log(this.cartProvider.productsFromCart.indexOf(this.cart));
         // this.cartProvider.productsFromCart[this.cartProvider.productsFromCart.indexOf(this.cart)].id_bill=res.id_bill;
          this.toast(res.message);
          this.cart={
            amount:null,
            payment_mode:"",
          }
      }else{
        this.errorAlert(res.message);
        this.cart={
          amount:null,
          payment_mode:"",
        }
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
