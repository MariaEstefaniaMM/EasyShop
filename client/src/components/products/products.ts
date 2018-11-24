import { NewProductPage } from './../../pages/new-product/new-product';
import { ProductsPage } from './../../pages/products/products';
import { Product } from './../../models/product';
import { Component, Input } from '@angular/core';
import { AlertController, ToastController, NavController } from 'ionic-angular';
import { UserProductPage } from '../../pages/user-product/user-product';
import { ProductProvider } from '../../providers/product/product';

@Component({
  selector: 'products',
  templateUrl: 'products.html'
})
export class ProductsComponent {

  text: string;
  @Input() product: Product;
  @Input() user: boolean;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public toastCtrl: ToastController,
              public productProvider: ProductProvider) {
    console.log('Hello ProductsComponent Component');
    this.text = 'Hello World';
  }

  goToProduct(product){
    this.navCtrl.push(UserProductPage, product);
  }

  goToEditProduct(product){
    this.navCtrl.push(NewProductPage, product);
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
            this.toast('Added!');
            console.log('added')
          }
        }
      ]
    });
    confirm.present();
  }

  deleteAlert(product){
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
            this.deleteProduct(product);
          }
        }
      ]
    });
    alert.present();
  }

  deleteProduct(product){
    this.productProvider.deleteProduct(product).subscribe((res:any) => {
      console.log('deleted');
        if (res.status==200){
          console.log(res);
          this.productProvider.userProducts.splice(this.productProvider.userProducts.indexOf(product),1);
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
