import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenProvider } from '../token/token';

@Injectable()
export class CartProvider {

  //serverUrl:string = "http://localhost:3000";
  serverUrl:string = "http://192.168.43.54:3000";  
  productsFromCart=[];

  constructor(public http: HttpClient,private tokenProvider: TokenProvider) {
    console.log('Hello CartProvider Provider');
  }

  getUserCart(){
    return this.http.get(this.serverUrl+'/carts/getUserCart', {headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
    .subscribe((res:any) => {
      if (res.status==200){
        console.log(res);
        this.productsFromCart=res.products;
      }else{
        console.log(res.message);
      }
    }), (err) => {
      console.log(err);
    }
  }

  addProductToCart(cart){
    return this.http.post(this.serverUrl+'/carts/addProductToCart', cart, {headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }

  updateProductCart(cart){
    console.log(cart);
      return this.http.put(this.serverUrl+'/carts/updateProductCart', cart,{headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }

  deleteProductCart(cart){
      return this.http.post(this.serverUrl+'/carts/deleteProductCart', cart, {headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }

  shop(bill){
    return this.http.post(this.serverUrl+'/carts/shop', bill, {headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }

}
