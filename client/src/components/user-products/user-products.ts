import { ProductProvider } from './../../providers/product/product';
import { ProductsPage } from './../../pages/products/products';
import { UserProductPage } from './../../pages/user-product/user-product';
import { Component, Input } from '@angular/core';
import { AlertController, ToastController, NavController } from 'ionic-angular';
import { Product } from '../../models/product';

@Component({
  selector: 'user-products',
  templateUrl: 'user-products.html'
})
export class UserProductsComponent {

  text: string;
  @Input() product: Product;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public toastCtrl: ToastController,
              public productProvider: ProductProvider) {
    console.log('Hello UserProductsComponent Component');
    this.text = 'Hello World';
  }

  goToProduct(product){
    this.navCtrl.push(UserProductPage, product);
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
