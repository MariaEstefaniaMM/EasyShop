import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, ToastController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserProvider } from './../../providers/user/user';
import { CameraProvider } from './../../providers/camera/camera';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  user={
    name:"",
    lastName:"",
    email:"",
    password:"",
    photo: "",
    address: "",
    phone: "",
  }

  signupform: FormGroup;
  validationMsg={
    'email':[
      {type:'required', message:'Please enter an email'},
      {type:'pattern', message:'Please enter a valid email'}
    ],
    'name':[
      {type:'required', message:'Please enter your name'},
      {type:'minlength', message:'Please enter a valid name'},
      {type:'maxlength', message:'Maximum 30 characters'},
    ],
    'lastName':[
      {type:'required', message:'Please enter your Lastname'},
      {type:'minlength', message:'Please enter a valid  Lastname'},
      {type:'maxlength', message:'Maximum 30 characters'},
    ],
    'phone':[
      {type:'required', message:'Please enter a phone number'},
      {type:'pattern', message:'Please enter a valid phone number'},
    ],
    'password':[
      {type:'required', message:'Please enter a password'},
      {type:'pattern', message:'Please enter a valid password'},
      {type:'minlength', message:'Minimum 6 characters'},
      {type:'maxlength', message:'Maximum 30 characters'},
    ],
    'address':[
      {type:'required', message:'Please enter a valid address'},
      {type:'pattern', message:'Please enter an address'},
    ],
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController,public toastCtrl: ToastController,
              public  cameraProvider:CameraProvider, private userProvider: UserProvider,
              public menuCtrl: MenuController, public formBuilder: FormBuilder) {
               this.initForm();
  }

 initForm(){
  let emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    this.signupform = this.formBuilder.group({
      name: (['', [Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3), Validators.maxLength(20), Validators.required]]),
      lastName: (['', [Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(20), Validators.required]]),
      email:(['', [Validators.pattern(emailPattern), Validators.required]]),
      phone:(['', [Validators.pattern('[0-9]*'), Validators.required]]),
      //^[0-9]{3,4}-[0-9]{7}$
      //^[a-zA-Z0-9_.+-]+@[A-Za-z0-9-]+.[A-Za-z0-9-.]+$
      password: (['', [Validators.minLength(6), Validators.maxLength(12), Validators.required]]),
      address: (['', [Validators.pattern('^[a-zA-Z0-9]'), Validators.required]]),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.menuCtrl.enable(false);
  }

  goToHome(){
    this.navCtrl.push(HomePage);
  }

  chooseImag(){
    this.cameraProvider.choose().then((res:any)=>{
      this.user.photo = res;
    }).catch((error) =>{
      console.log(error);
    })
  }

  signUp() {
    console.log(this.user)
    if (this.user.name=="" || this.user.lastName=="" || this.user.email=="" || this.user.password==""){
        (this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Please fill all the fields',
            buttons: ['OK']
        })).present();
    }else{
      this.user.email=this.user.email.toLowerCase()
    this.userProvider.createUser(this.user).subscribe((res:any) => {
      if (res.status==200){
          console.log(res);    
          this.presentToast(res.message);
          this.navCtrl.push(HomePage);
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
