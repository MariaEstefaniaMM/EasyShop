import { ProductsPage } from './../products/products';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from './../../providers/user/user';
import { User } from '../../models/user';
import { AlertController, ToastController } from 'ionic-angular';
import { CameraProvider } from './../../providers/camera/camera';
import { ChangepassPage } from '../changepass/changepass';
import { TokenProvider } from './../../providers/token/token';
import { NativeStorage } from '@ionic-native/native-storage';
import { UserProfilePage } from '../user-profile/user-profile';
import { WishlistPage } from '../wishlist/wishlist';

@IonicPage()
@Component({
  selector: 'page-user-account',
  templateUrl: 'user-account.html',
})
export class UserAccountPage {
  
  readonly:boolean=true;
  originalUser:User;
  user:User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, 
              public  cameraProvider:CameraProvider, private userProvider: UserProvider, private nativeStorage: NativeStorage, private tokenProvider:TokenProvider) {
              this.user=this.userProvider.user;
              this.originalUser=JSON.parse(JSON.stringify(this.user));
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad UserAccountPage');
  }

  goToUserProfile(){
    this.navCtrl.push(UserProfilePage);
  }

  goToUserProducts(){
    this.navCtrl.setRoot(ProductsPage,{data:true});
  }

  goToWishlist(){
    this.navCtrl.push(WishlistPage);
  }

  
}
