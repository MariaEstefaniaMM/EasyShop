import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from './../../providers/user/user';
import { AlertController, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { UserAccountPage } from '../user-account/user-account';

@IonicPage()
@Component({
  selector: 'page-changepass',
  templateUrl: 'changepass.html',
})
export class ChangepassPage {

  user:User;
  password={old_password:'',new_password:''}

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider,
    public alertCtrl: AlertController, public toastCtrl: ToastController, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepassPage');
  }

  updatePassword(){
    this.userProvider.updatePassword(this.password).subscribe((res:any) => {
      if (res.status==200){
        console.log("Modified");
        console.log(res);
        this.presentToast(res.message);
        this.navCtrl.setRoot(UserAccountPage);
    }},
    (err) => {
      console.log(err); 
      this.errorAlert(JSON.stringify(err));
  });
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
