import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Product } from '../../models/product';
import { ProductProvider } from '../../providers/product/product';
import { NewProductPage } from '../new-product/new-product';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  myInput:string;
  products:Product[];
  dashboard_arr=[];
  searchProducts:Product[];
  user;
  category: string = "AllProducts";
  filter:Product[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,
              public productProvider: ProductProvider) {
        this.user=navParams.get('data');
        console.log(this.user);
        //this.loadProducts();
  }

 /* loadProducts(){
    this.productProvider.getAllProducts();
    this.products = this.productProvider.products;
    this.products=[];
    for (let i = 0; i < 2; i++) {
      this.dashboard_arr.push(this.products[this.dashboard_arr.length]);
    }
  } */

 /* doInfinite(infiniteScroll) {
    setTimeout( ()=> {
      this.products=[];
      for (let i = 0; i < 2; i++) {
        this.dashboard_arr.push(this.products[this.dashboard_arr.length]);
      }    
      infiniteScroll.complete();
    }, 2000);
  } */


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
    this.menuCtrl.enable(true);
  }

  segmentChange(category){
      console.log(category.value);
    if(!this.user){
        this.filter=this.productProvider.products.filter(function(product:any){return product.des_category===category.value});
        console.log(this.products);
    }else{
        this.filter=this.productProvider.userProducts.filter(function(product:any){return product.des_category===category.value});

    }
  }

  ionViewWillEnter() {
    console.log('ionViewWillLoad ProductsPage');
    if(!this.user){
      this.productProvider.getAllProducts();
      //this.products=this.productProvider.products;
      console.log(this.products);
    }else{
      //this.products=this.productProvider.userProducts;
    }
  }

  goToNewProduct(){
    this.navCtrl.push(NewProductPage);
  }

  onInput(){
    if(!this.user){
      this.products=this.productProvider.products;
      console.log(this.products);
    }else{
      this.products=this.productProvider.userProducts;
    }
    this.searchProducts = this.products.filter((product) => {
          return product.name_product.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1;
      }); 
    }
}
