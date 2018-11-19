import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { CameraProvider } from '../../providers/camera/camera';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-new-product',
  templateUrl: 'new-product.html',
})
export class NewProductPage {

  readonly:boolean=true;
  originalUser:User;
  user: User
  category: Array<{title: string}>;

  constructor(public navCtrl: NavController, public  cameraProvider:CameraProvider, private userProvider: UserProvider, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.user=this.userProvider.user;
    this.originalUser=JSON.parse(JSON.stringify(this.user));
    this.category = [
      { title: 'Clothes'},
      { title: 'Shoes'},
      { title: 'Accesories'},
    ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProductPage');
  }

  chooseImage(){
    this.cameraProvider.choose().then((res:any)=>{
      this.user.user_photo = res;
    }).catch((error) =>{
      console.log(error);
    })
  }

  goToEditProfile(){
    this.readonly=false;
  }

  updateProduct(){
    console.log('Update Product');
  }

  deleteProduct(){
    let alert = this.alertCtrl.create({
      title: 'Do you want delete your product?',
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
          }
        }
      ]
    });
    alert.present();
  }


}
