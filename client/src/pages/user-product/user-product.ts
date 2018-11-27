import { CartProvider } from './../../providers/cart/cart';
import { CommentProvider } from './../../providers/comment/comment';
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
  comment={
    id_comment:null,
    id_product:null,
    id_user:null,
    comment_text:"",
    id_first_comment:null,
    readonly:true
  };
  cart={
    id_cart:null,
    id_product:null,
    product_quantity:null,
    return:false,
  }
  productComments;
  show:boolean=false;
  //productComments;
  //commentResponses;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public toastCtrl: ToastController,
              public productProvider: ProductProvider, public userProvider: UserProvider, public commentProvider: CommentProvider,
              public cartProvider:CartProvider) {
      this.product=this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProductPage');
    if(this.product.id_user==this.userProvider.user.id_user){
      this.owner=true;
    }  
    console.log(this.owner);    
    this.commentProvider.getProductComments(this.product.id_product)
  }

  /*doInfinite(event) {
    setTimeout( ()=> {
      for (let i = 0; i < 3 ; i++) {
        this.commentProvider.getProductComments(this.product.id_product);
      }    
      event.complete();
    }, 2000);    
  }


  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
      this.commentProvider.productComments;
      console.log(this.commentProvider.productComments);
    }, 2000);
  }*/

  showComments(){
    this.show=!this.show;
    this.productComments= this.commentProvider.productComments.filter((comment:any)=>{return comment.id_first_comment===null})
    console.log(this.productComments)
    console.log(this.commentProvider.productComments)
  }

  addAlert(){
    console.log('alert');
    const confirm = this.alertCtrl.create({
      title: 'How many products?',
      inputs: [
        {
          name: 'quantity',
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
          text: 'ADD TO CART',
          handler: (data)=>{
            this.cart.product_quantity=data.quantity;
            this.addToCart();
            console.log('added', data)
          }
        }
      ]
    });
    confirm.present();
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

  createComment(){
    if (this.comment.comment_text!==""){
    this.comment.id_product=this.product.id_product;
    this.comment.id_user=this.product.id_user;
    console.log(this.comment);
    this.commentProvider.createComment(this.comment).subscribe((res:any) => {
      if (res.status==200){
          console.log(res);    
          this.toast(res.message);
          this.comment.id_comment=res.data.id_comment;
          this.commentProvider.productComments.push(JSON.parse(JSON.stringify(this.comment)));
          this.productComments.push(JSON.parse(JSON.stringify(this.comment)));
          this.comment={
            id_comment:null,
            id_product:null,
            id_user:null,
            comment_text:"",
            id_first_comment:null,
            readonly:true
          };
      }else{
        this.errorAlert(res.message);
      }
    }), (err) => {
      this.errorAlert(JSON.stringify(err)); 
    }
    }
  }

  addToCart(){
    if (this.cart.product_quantity!==""){
    this.cart.id_product=this.product.id_product;
    console.log(this.cart);
    this.cartProvider.addProductToCart(this.cart).subscribe((res:any) => {
      if (res.status==200){
          console.log(res);    
          this.toast(res.message);
          this.cart.id_cart=res.data.id_cart;
          this.cartProvider.productsFromCart.push(JSON.parse(JSON.stringify(this.cart)));
          this.cart={
            id_cart:null,
            id_product:null,
            product_quantity:null,
            return:false
          };
      }else{
        this.errorAlert(res.message);
      }
    }), (err) => {
      this.errorAlert(JSON.stringify(err)); 
    }
    }
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
