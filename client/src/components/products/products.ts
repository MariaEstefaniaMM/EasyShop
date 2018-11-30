import { CartProvider } from './../../providers/cart/cart';
import { NewProductPage } from './../../pages/new-product/new-product';
import { ProductsPage } from './../../pages/products/products';
import { Product } from './../../models/product';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertController, ToastController, NavController } from 'ionic-angular';
import { UserProductPage } from '../../pages/user-product/user-product';
import { ProductProvider } from '../../providers/product/product';

@Component({
  selector: 'products',
  templateUrl: 'products.html'
})
export class ProductsComponent {

  text: string;
  total:any;
  Subtotal:any;
  originalProduct;
  @Input() product: Product;
  @Input() user: boolean;
  @Input() wishlist: boolean;
  @Input() bill: boolean;
  @Output() productDeleted: EventEmitter<any> = new EventEmitter<any>();

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public toastCtrl: ToastController,
              public productProvider: ProductProvider, public cartProvider: CartProvider) {
    console.log('Hello ProductsComponent Component',this.product);
    this.text = 'Hello World';
    //this.originalProduct=JSON.parse(JSON.stringify(this.product));
  }

  getSubtotal(){
    this.Subtotal = this.Subtotal + this.total;
    return this.Subtotal;
  }

  getTotal(product){
    this.total= product.product_quantity*product.price_product;
    return this.total;
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

  editAlert(product){
    this.originalProduct=JSON.parse(JSON.stringify(product));
    console.log('alert');
    const confirm = this.alertCtrl.create({
      title: 'How many products?',
      inputs: [
        {
          name: 'quantity',
          placeholder: '1',
          type: 'number',
          value: product.product_quantity
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
          text: 'EDIT QUANTITY',
          handler: (data)=>{
            product.product_quantity=parseInt(data.quantity);
            this.updateQuantity(product);
            console.log('added', data.quantity)
          }
        }
      ]
    });
    confirm.present();
  }

  updateQuantity(product){
    console.log(product,this.originalProduct);
    if(product.product_quantity<this.originalProduct.product_quantity){
      product["return"]=true;
      product.product_quantity=this.originalProduct.product_quantity-product.product_quantity
    }else{
      product["return"]=false;
      product.product_quantity=product.product_quantity-this.originalProduct.product_quantity
    }
    console.log(product,this.originalProduct);
    this.cartProvider.updateProductCart(product).subscribe((res:any) => {
      if (res.status==200){
          console.log(res);    
          this.toast(res.message);
          if(!product.return){
            product.product_quantity=product.product_quantity+this.originalProduct.product_quantity
          }else{
            product.product_quantity=this.originalProduct.product_quantity-product.product_quantity
          }
          this.originalProduct.product_quantity=product.product_quantity
          console.log(product,this.originalProduct);
      }else{
        product.product_quantity=this.originalProduct.product_quantity;
        console.log(product,this.originalProduct);
        this.errorAlert(res.message);
      }
    }), (err) => {
      this.errorAlert(JSON.stringify(err)); 
    }
  }

  deleteAlertWishList(product){
    let alert = this.alertCtrl.create({
      title: 'Do you want delete this product from your cart?',
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
            this.deleteProductCart(product);
          }
        }
      ]
    });
    alert.present();
  }

  deleteProductCart(product){
    this.cartProvider.deleteProductCart(product).subscribe((res:any) => {
      console.log('deleted');
        if (res.status==200){
          console.log(res);
          this.cartProvider.productsFromCart.splice(this.cartProvider.productsFromCart.indexOf(product),1);
          this.toast('Product deleted');
          this.productDeleted.emit(product);
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
