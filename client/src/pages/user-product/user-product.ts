import { ProductsPage } from './../products/products';
import { ProductProvider } from './../../providers/product/product';
import { NewProductPage } from './../new-product/new-product';
import { Product } from './../../models/product';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-user-product',
  templateUrl: 'user-product.html',
})

export class UserProductPage {

  product: Product;
  owner:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public toastCtrl: ToastController,
              public productProvider: ProductProvider, public userProvider: UserProvider) {
      this.product=this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProductPage');
    if(this.product.id_user==this.userProvider.user.id_user){
      this.owner=true;
    }  
    console.log(this.owner);      
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

  goToEditProduct(){
      this.navCtrl.push(NewProductPage, this.product);
  }

  deleteProduct(){
    this.productProvider.deleteProduct(this.product).subscribe((res:any) => {
      console.log('deleted');
        if (res.status==200){
          console.log(res);
          this.productProvider.userProducts.splice(this.productProvider.userProducts.indexOf(this.product),1);
          this.toast('Product deleted');
          this.navCtrl.setRoot(ProductsPage,{data: true});
      }else{
        this.errorAlert(res.message);
      }
      }, (err) => {
        this.errorAlert(JSON.stringify(err));         
      }
      );
  }

  deleteAlert(){
    const confirm = this.alertCtrl.create({
      title: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'CANCEL',
          handler: ()=>{ console.log('CANCEL'); }
        },
        {
          text: 'DELETE',
          handler: ()=>{ this.deleteProduct(); }
        }
      ]
    });
    confirm.present();
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
