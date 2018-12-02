import { WishlistPage } from './../wishlist/wishlist';
import { CartProvider } from './../../providers/cart/cart';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user-bills',
  templateUrl: 'user-bills.html',
})
export class UserBillsPage {

  bills;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public cartProvider:CartProvider,
              public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserBillsPage');
    this.menuCtrl.enable(true);
    this.groupBy(this.cartProvider.productsFromCart, i=>i.id_bill);
  }

  groupBy(myArray, funct){
    this.bills =  myArray.reduce(function (result, item){
        var val = funct(item);
        if(!result[val]) result[val]=[];
        result[val].push(item);
        return result;
      }, [])
    console.log(this.bills);
  }

  goToBillDetail(bill){
    console.log(bill);
    this.navCtrl.push(WishlistPage, bill);
  }
}
