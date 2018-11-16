import { ProductsPage } from './../products/products';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { TokenProvider } from './../../providers/token/token';
import { NativeStorage } from '@ionic-native/native-storage';
import { NavController, AlertController } from 'ionic-angular';
import { UserProvider } from './../../providers/user/user';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user={ 
    email:"",
    password:""
  }

  constructor(public navCtrl: NavController, private userProvider: UserProvider,
    private nativeStorage: NativeStorage, private tokenProvider:TokenProvider,
    public alertCtrl: AlertController) {

  }

  ionViewCanEnter(){
    console.log('CanEnter HomePage');
    if (this.tokenProvider.getToken()){
      console.log('go to NotesListPage');
      this.navCtrl.setRoot(ProductsPage);
    }else{
      return true;
    }
  }

  gotoToProducts(){
    console.log(this.user);
    if (this.user.email=="" || this.user.password=="" ){
      (this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Please fill all the fields',
        buttons: ['OK']
      })).present();
  }else this.userProvider.login(this.user).subscribe((res:any) => {
    if(res.status === 200) {
      this.nativeStorage.setItem('userToken', res.token);
      this.tokenProvider.token=res.token;
      console.log(this.tokenProvider.token, res.token);
      this.userProvider.user=res.user;
      console.log(this.userProvider.user)
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
