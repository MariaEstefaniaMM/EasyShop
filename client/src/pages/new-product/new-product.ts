import { UserProvider } from '../../providers/user/user';
import { Product } from './../../models/product';
import { ProductsPage } from './../products/products';
import { ProductProvider } from './../../providers/product/product';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, MenuController } from 'ionic-angular';
import { CameraProvider } from '../../providers/camera/camera';

@IonicPage()
@Component({
  selector: 'page-new-product',
  templateUrl: 'new-product.html',
})
export class NewProductPage {

  originalProduct: Product;
  product: Product = {
    id_product:null,
    name_product: "",
    des_product: "",
    price_product: null,
    quantity: null,
    img_product: "",
    id_category: null,
    id_user: null
  }
  newProduct:boolean;

  constructor(public navCtrl: NavController, public  cameraProvider:CameraProvider, 
              public navParams: NavParams, public alertCtrl: AlertController, public userProvider: UserProvider,
              public toastCtrl: ToastController, public productProvider: ProductProvider, public menuCtrl: MenuController) {
      this.product=this.navParams.data;
      this.originalProduct=JSON.parse(JSON.stringify(this.product));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProductPage');
    this.menuCtrl.enable(true);
    if (Object.keys(this.product).length === 0)
      this.newProduct=true;
  }

  chooseImage(){
    this.cameraProvider.choose().then((res:any)=>{
      this.product.img_product = res;
    }).catch((error) =>{
      console.log(error);
    })
  }

  saveProduct(){
    console.log(this.product);
    if (this.product.name_product=="" || this.product.des_product=="" || this.product.price_product==null || this.product.quantity==null
        || this.product.id_category==null){
      this.errorAlert('Please fill all the fields');
    }else{
      if (this.newProduct){
        this.createProduct();
      }else if(JSON.stringify(this.originalProduct)!==JSON.stringify(this.product)){
        console.log("updateProduct");
        this.updateProduct();
      }
  }
  }

  createProduct(){
    console.log(this.product);
    this.productProvider.createProduct(this.product).subscribe((res:any) => {
      if (res.status==200){
          console.log(res);    
          this.presentToast(res.message);
          this.product.id_product=res.data.id_product;
          this.product.id_user=this.userProvider.user.id_user;
          this.product["des_category"]=this.productProvider.category[this.product.id_category-1].title;
          this.productProvider.userProducts.push(this.product);
          console.log(this.productProvider.userProducts)
          this.navCtrl.setRoot(ProductsPage, {data:true});
      }else{
        this.errorAlert(res.message);
      }
    }), (err) => {
      this.errorAlert(JSON.stringify(err)); 
    }
  }

  updateProduct(){
    console.log(this.product);
    this.productProvider.updateProduct(this.product).subscribe((res:any) => {
      if (res.status==200){
          console.log(res);    
          this.presentToast(res.message);
          this.navCtrl.setRoot(ProductsPage);
      }else{
        this.product=this.originalProduct;
        this.errorAlert(res.message);
      }
    }), (err) => {
      this.errorAlert(JSON.stringify(err)); 
    }
  }

  errorAlert(message){
    (this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    })).present();  
  }

  presentToast(message){
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
