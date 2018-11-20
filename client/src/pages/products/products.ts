import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Product } from '../../models/product';
import { ProductProvider } from '../../providers/product/product';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  myInput:string;
  products:Product[];
  searchProducts:Product[];
  user;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,
              public productProvider: ProductProvider) {
        this.user=navParams.get('data');
        console.log(this.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
    this.menuCtrl.enable(true);
  }

  ionViewWillLoad() {
    console.log('ionViewWillLoad ProductsPage');
    if(!this.user){
        this.productProvider.getAllProducts();
        this.products=this.productProvider.products;
        console.log(this.products);
    }else{
        this.products=this.productProvider.userProducts;
    }
  }

  onInput(){
    this.searchProducts = this.products.filter((product) => {
          return product.name_product.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1;
      }); 
    }
}
