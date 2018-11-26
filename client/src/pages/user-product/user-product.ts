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
    comment_text:"",
    id_first_comment:null,
    readonly:true
  };
  show:boolean=false;
  //productComments;
  //commentResponses;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public toastCtrl: ToastController,
              public productProvider: ProductProvider, public userProvider: UserProvider, public commentProvider: CommentProvider) {
      this.product=this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProductPage');
    if(this.product.id_user==this.userProvider.user.id_user){
      this.owner=true;
    }  
    console.log(this.owner);    
    this.commentProvider.getProductComments(this.product.id_product)
    /*.subscribe((res:any) => {
      if (res.status==200){
        console.log(res);
        this.productComments=res.comments.filter(function(comment:any){return comment.id_first_comment===null});
        console.log(this.productComments);        
        this.commentResponses=res.comments.filter(function(comment:any){return comment.id_first_comment!==null});;
        console.log(this.commentResponses);                
      }else{
        console.log(res.message);
      }
    }), (err) => {
      console.log(err);
    }*/
  }

  doInfinite(event) {
    setTimeout( ()=> {
      for (let i = 0; i < 3 ; i++) {
        this.commentProvider.getProductComments(this.product.id_product);
        //this.commentProvider.productComments = this.commentProvider.productComments.concat(this.product.id_product)
        //this.commentProvider.commentResponses.push(this.product.id_product);
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
  }

  showComments(){
    this.show=!this.show
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

  createComment(){
    if (this.comment.comment_text!==""){
    this.comment.id_product=this.product.id_product;
    console.log(this.comment);
    this.commentProvider.createComment(this.comment).subscribe((res:any) => {
      if (res.status==200){
          console.log(res);    
          this.toast(res.message);
          this.comment.id_comment=res.data.id_comment;
          this.commentProvider.productComments.push(JSON.parse(JSON.stringify(this.comment)));
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
