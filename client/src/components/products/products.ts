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
  @Output() updateTotal: EventEmitter<any> = new EventEmitter<any>();

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public toastCtrl: ToastController,
              public productProvider: ProductProvider, public cartProvider: CartProvider) {
    console.log('Hello ProductsComponent Component',this.product);
    this.text = 'Hello World';
    //this.originalProduct=JSON.parse(JSON.stringify(this.product));
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

  //------DELETE USER PRODUCT-----//

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
          //----Delete from product array in provider-----//
          this.productProvider.userProducts.splice(this.productProvider.userProducts.indexOf(product),1);
          this.toast('Product deleted');
          this.navCtrl.setRoot(ProductsPage,{data: true}); // Go to Products page
      }else{
        this.errorAlert(res.message);
      }
      }, (err) => {
        this.errorAlert(JSON.stringify(err));         
      }
      );
  }

  //------EDIT QUANTITY IN MY CART-----//

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
            product.product_quantity=parseInt(data.quantity); // Get quantity in input
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
    //------Check wants more or less of the product-----//
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
          console.log(product,this.originalProduct);
          //------Refresh the quantity in the view-----//          
          if(!product.return){
            product.product_quantity=product.product_quantity+parseInt(this.originalProduct.product_quantity)
          }else{
            product.product_quantity=parseInt(this.originalProduct.product_quantity)-product.product_quantity
          }
          //------Update the product reference-----//
          this.originalProduct.product_quantity=product.product_quantity
          console.log(product,this.originalProduct);
          this.updateTotal.emit(product);
      }else{
        //------If an error ocurred don't change the product-----//
        product.product_quantity=this.originalProduct.product_quantity;
        console.log(product,this.originalProduct);
        this.errorAlert(res.message);
      }
    }), (err) => {
      this.errorAlert(JSON.stringify(err)); 
    }
  }

  //------DELETE PRODUCT FROM MY CART-----//

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
