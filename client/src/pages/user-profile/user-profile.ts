import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from './../../providers/user/user';
import { User } from '../../models/user';
import { AlertController, ToastController } from 'ionic-angular';
import { CameraProvider } from './../../providers/camera/camera';
import { HomePage } from '../home/home';
import { ChangepassPage } from '../changepass/changepass';
import { TokenProvider } from './../../providers/token/token';
import { NativeStorage } from '@ionic-native/native-storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  
  readonly:boolean=true;
  originalUser:User;
  user:User;
  profileForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, 
              public  cameraProvider:CameraProvider, private userProvider: UserProvider, private nativeStorage: NativeStorage, private tokenProvider:TokenProvider,
              public formBuilder: FormBuilder) {
              this.user=this.userProvider.user;
              this.originalUser=JSON.parse(JSON.stringify(this.user));
              this.userForm();
  }

  /*ionViewDidEnter(){
    this.profileForm = this.formBuilder.group({
      name: (['', [Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3), Validators.maxLength(30), Validators.required]]),
      lastName: (['', [Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required]]),
      email:(['', [Validators.pattern('^[a-zA-Z0-9_.+-]+@[A-Za-z0-9-]+.[A-Za-z0-9-.]+$'), Validators.required]]),
      phone:(['', [Validators.pattern('^[0-9]{3,4}-[0-9]{7}$'), Validators.required]]),
      password: (['', [Validators.minLength(6), Validators.maxLength(12), Validators.required]]),
      address: (['', [Validators.pattern('^[a-zA-Z0-9]'), Validators.required]]),
    });
  } 
  */
  userForm(){
    let emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    this.profileForm = this.formBuilder.group({
      name: (['', [Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3), Validators.maxLength(30), Validators.required]]),
      lastName: (['', [Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required]]),
      email:(['', [Validators.pattern(emailPattern), Validators.required]]),
      phone:(['', [Validators.pattern('^[0-9]{3,4}-[0-9]{7}$'), Validators.required]]),
      password: (['', [Validators.minLength(6), Validators.maxLength(12), Validators.required]]),
      address: (['', [Validators.pattern('^[a-zA-Z0-9]'), Validators.required]]),
    });
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad UserAccountPage');
  }

  ionViewCanLeave(){
      if(JSON.stringify(this.originalUser)!==JSON.stringify(this.user)){
        this.alertCtrl.create({
          title:"Confirm",
          message:"Do you want to save changes?",
          buttons:[{
              text: "Discard changes",
              role: "cancel",
              handler: ()=> {
                return true
              }
          },
          {
            text:"Save changes",
            handler: ()=> {
              this.updateUser()
              return true
            }
          }]
        })  
      }
  }
  
  goToEditProfile(){
    this.readonly=false;
  }

  changePass(){
    this.navCtrl.setRoot(ChangepassPage);
  }

  chooseImage(){
    this.cameraProvider.choose().then((res:any)=>{
      this.user.user_photo = res;
    }).catch((error) =>{
      console.log(error);
    })
  }

  updateUser(){
    console.log(this.user);
    this.userProvider.updateUser(this.user).subscribe((res:any) => {
      if (res.status==200){
        console.log("Modified");
        this.nativeStorage.setItem('userToken', res.token);
        this.tokenProvider.token=res.token;
        console.log(this.tokenProvider.token, res.token);
        this.userProvider.user=res.user;
        console.log(this.userProvider.user)
        this.readonly=true;
        this.toast("Profile updated");
      }else{
        this.user=this.originalUser;
        this.errorAlert(res.message);
      }
    },
    (err) => {
      console.log(err); 
  });
  }

  deleteAccout(){
    let alert = this.alertCtrl.create({
      title: 'Do you want delete your account?',
      inputs: [
        {
          name: 'password',
          placeholder: 'password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: data =>{
            console.log('cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: data =>{
            console.log('cancel clicked');
            this.user.user_password=data.password;
            this.deleteUser()
          }
        }
      ]
    });
    alert.present();
  }

  deleteUser(){
    this.errorAlert(this.user.user_password)
    this.userProvider.deleteUser(this.user).subscribe((res:any) => {
      console.log('deleted');
        if (res.status==200){
          console.log(res);
          this.navCtrl.setRoot(HomePage);
      }else{
        console.log(res.message)
        this.errorAlert(res.message);
      }
      }, (err) => {
        console.log(err)
        this.errorAlert(JSON.stringify(err));         
      }
      );
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

