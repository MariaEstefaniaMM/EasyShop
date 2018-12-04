import { CartProvider } from './../../providers/cart/cart';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Events, Select, ModalController, ModalOptions } from 'ionic-angular';
import { ProductsPage } from '../products/products';

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
  total: number=0;

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
    for(var i=0; i<this.productsFromCart.length; i++){
      this.total=this.total+parseInt(this.productsFromCart[i].price_product)*this.productsFromCart[i].product_quantity;
    } 
    console.log(this.cartProvider.productsFromCart, this.productsFromCart);
    console.log(this.bill);

  }

  getTotal(){
    this.total=0;
    console.log(this.productsFromCart);
    for(var i=0; i<this.productsFromCart.length; i++){
      this.total=this.total+parseInt(this.productsFromCart[i].price_product)*this.productsFromCart[i].product_quantity;
      console.log(this.total, parseInt(this.productsFromCart[i].price_product), this.productsFromCart[i].product_quantity);
    } 
  }

  goToProducts(){
    this.navCtrl.setRoot(ProductsPage);
  }

  openModal(res){  

    const myData ={
      id: res.id_bill
    }

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false,
      showBackdrop: false
    }

    const modalCart = this.modalCtrl.create('ModalCartPage',{data: myData.id}, myModalOptions);
    modalCart.present();
  }

  openSelect(){
    this.selectRef.open();
  }

  shopProduct(){
    console.log(this.productsFromCart);
    if(!(this.productsFromCart.length==0)){
    this.cartProvider.shop(this.cart).subscribe((res:any) => {
      console.log('purchase');
        if (res.status==200){
          this.openModal(res);
          console.log(res.id_bill);
          console.log(res);
          //this.cartProvider.productsFromCart[this.cartProvider.productsFromCart.indexOf(this.cart)].id_bill=res.id_bill;
          this.cartProvider.getUserCart();
          this.productsFromCart=[]
          this.total=0
          //console.log(this.cartProvider.productsFromCart.indexOf(this.cart));
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
  }

  deleteFromView(product){
    if(this.productsFromCart){
      if(this.productsFromCart.indexOf(product)>-1){
            this.productsFromCart.splice(this.productsFromCart.indexOf(product),1);
          }
    }
    this.getTotal();    
  }

  updateTotal(product){
    console.log('update', product);
      this.getTotal();
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

