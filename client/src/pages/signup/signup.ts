import { NoteProvider } from './../../providers/note/note';
import { TokenProvider } from './../../providers/token/token';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from './../home/home';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { UserProvider } from './../../providers/user/user';
import { CameraProvider } from './../../providers/camera/camera';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  user={
    name:"",
    lastName:"",
    email:"",
    password:"",
    photo: "",
    address: "",
    phone: "",
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private usersProvider: UserProvider,
              private nativeStorage:NativeStorage, public alertCtrl: AlertController, private tokenProvider:TokenProvider,
              public toastCtrl: ToastController, public  cameraProvider:CameraProvider) {
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
    this.usersProvider.createUser(this.user).subscribe((res:any) => {
      if (res.status==200){
          console.log(res);    
          this.presentToast(res.message);
          //this.nativeStorage.setItem('userToken', res.token);
          //this.tokenProvider.token=res.token;
          //this.noteProvider.notes=[];
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
