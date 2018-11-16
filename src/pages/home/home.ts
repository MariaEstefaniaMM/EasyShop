import { ProductsPage } from './../products/products';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  gotoToHome(){
    this.navCtrl.push(ProductsPage);
  }

  goToSignUp(){
    this.navCtrl.push(SignupPage);
  }

}
