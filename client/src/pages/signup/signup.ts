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
      {type:'required',message:'Please enter an email'},
      {type:'pattern',message:'Please enter a valid email'}
    ]
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController,public toastCtrl: ToastController,
              public  cameraProvider:CameraProvider, private userProvider: UserProvider,
              public menuCtrl: MenuController, formBuilder:FormBuilder) {
                this.signupform = formBuilder.group({
                      email:(['', [Validators.pattern('^[a-zA-Z0-9_.+-]+@[A-Za-z0-9-]+.[A-Za-z0-9-.]+$'), Validators.required]]),
                      phone:(['', [Validators.pattern('^[0-9]{3,4}-[0-9]{7}$'), Validators.required]])
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
