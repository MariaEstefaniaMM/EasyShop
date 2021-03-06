import { CartProvider } from './../../providers/cart/cart';
import { ProductsPage } from './../products/products';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { TokenProvider } from './../../providers/token/token';
import { NativeStorage } from '@ionic-native/native-storage';
import { NavController, AlertController, MenuController, LoadingController } from 'ionic-angular';
import { UserProvider } from './../../providers/user/user';
import { ProductProvider } from './../../providers/product/product';
//import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user={ 
    username:"",
    password:""
  }
  loading:any;
  loadingP:any;

  constructor(public navCtrl: NavController, private userProvider: UserProvider,
    private nativeStorage: NativeStorage, private tokenProvider:TokenProvider,
    public alertCtrl: AlertController, public menuCtrl: MenuController, 
    private productProvider: ProductProvider, public loadingCtrl: LoadingController, public cartProvider:CartProvider) {

  }

  ionViewDidLoad(){
    this.menuCtrl.enable(false);
   //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE_SECONDARY);
  // this.screenOrientation.lock('portrait')
  }

  ionViewCanEnter(){
    console.log('CanEnter HomePage');
    if (this.tokenProvider.getToken()!==""){
      console.log('go to ProductPage');
      this.navCtrl.setRoot(ProductsPage);
    }else{
      return true;
    }
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
   this.loading.present();
  
    setTimeout(() => {
        this.loading.dismiss();
    }, 2000);
  }

  loadingProducts() {
    this.loadingP = this.loadingCtrl.create({
      content: 'Loading Products, Please wait...'
    });
  
    this.loadingP.present();
  
    setTimeout(() => {
      this.loadingP.dismiss();
    }, 4000);
  }

  gotoToProducts(){
    this.presentLoadingDefault();
    if (this.user.username=="" || this.user.password=="" ){
      (this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Please fill all the fields',
        buttons: ['OK']
      })).present();
  }else this.userProvider.login(this.user).subscribe((res:any) => {
    this.user.username=this.user.username.toLowerCase()
    if(res.status === 200) {
      this.loadingProducts();
      this.nativeStorage.setItem('userToken', res.token);
      this.tokenProvider.token=res.token;
      console.log(this.tokenProvider.token, res.token);
      this.userProvider.user=res.user;
      console.log(this.userProvider.user);
      this.productProvider.getUserProducts();
      this.cartProvider.getUserCart();
      this.navCtrl.setRoot(ProductsPage);
  } else {
    console.log('err');
    (this.alertCtrl.create({
      title: 'Error',
      subTitle: res.message,
      buttons: ['OK']
    })).present();
  }
},
  (err) => {
    console.log(err);
   (this.alertCtrl.create({
      title: 'Error',
      subTitle: JSON.stringify(err),
      buttons: ['OK']
    })).present();    
  }
  );  
  }

  goToSignUp(){
    this.navCtrl.push(SignupPage);
  }

}
