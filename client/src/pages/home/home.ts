import { ProductsPage } from './../products/products';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { TokenProvider } from './../../providers/token/token';
import { NativeStorage } from '@ionic-native/native-storage';
import { NavController, AlertController, MenuController } from 'ionic-angular';
import { UserProvider } from './../../providers/user/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user={ 
    username:"",
    password:""
  }
  signinForm: FormGroup;
  validationMsg={
    'email':[
      {type:'required', message:'Please enter an email'},
      {type:'pattern', message:'Please enter a valid email'}
    ],
    'password':[
      {type:'required', message:'Please enter a password'},
      {type:'pattern', message:'Please enter a valid password'},
      {type:'minlength', message:'Minimum 6 characters'},
      {type:'maxlength', message:'Maximum 30 characters'},
    ]
  }

  constructor(public navCtrl: NavController, private userProvider: UserProvider,
    private nativeStorage: NativeStorage, private tokenProvider:TokenProvider,
    public alertCtrl: AlertController, public menuCtrl: MenuController, public formBuilder: FormBuilder) {
      this.userForm();

  }

  ionViewDidLoad(){
    this.menuCtrl.enable(false);
  }

  userForm(){
    let emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    this.signinForm = this.formBuilder.group({
      email:(['', [Validators.pattern(emailPattern), Validators.required]]),
      password: (['', [Validators.minLength(6), Validators.maxLength(12), Validators.required]]),
    });
  }


  ionViewCanEnter(){
    console.log('CanEnter HomePage');
    if (this.tokenProvider.getToken()){
      console.log('go to ProductPage');
      this.navCtrl.setRoot(ProductsPage);
    }else{
      return true;
    }
  }

  gotoToProducts(){
    if (this.user.username=="" || this.user.password=="" ){
      (this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Please fill all the fields',
        buttons: ['OK']
      })).present();
  }else this.userProvider.login(this.user).subscribe((res:any) => {
    this.user.username=this.user.username.toLowerCase()
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
