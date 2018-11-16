import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserProvider } from './../../providers/user/user';
import { CameraProvider } from './../../providers/camera/camera';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController,public toastCtrl: ToastController,
              public  cameraProvider:CameraProvider, private userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  goToHome(){
    this.navCtrl.push(HomePage);
  }

  chooseImage(){
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
