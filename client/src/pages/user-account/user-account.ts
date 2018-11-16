import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from './../../providers/user/user';
import { User } from '../../models/user';
import { AlertController, ToastController } from 'ionic-angular';
import { CameraProvider } from './../../providers/camera/camera';
import { HomePage } from '../home/home';
import { ChangepassPage } from '../changepass/changepass';

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
              public  cameraProvider:CameraProvider, private userProvider: UserProvider) {
              this.user=this.userProvider.user;
              this.originalUser=JSON.parse(JSON.stringify(this.user));
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
    this.userProvider.updateUser(this.user).subscribe((res:any) => {
      if (res.status==200){
        console.log("Modified");
        this.readonly=true;
        this.toast("Profile updated");
      }else{
        this.user=this.originalUser;
        this.errorAlert(res.message);
      }
    },
    (err) => {
      console.log(JSON.stringify(err)); 
  });
  }

  deleteUser(){
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
