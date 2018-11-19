import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenProvider } from '../token/token';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {

  serverUrl:string = "http://localhost:3000";

  constructor(public http: HttpClient,private tokenProvider: TokenProvider) {
    console.log('Hello ProductProvider Provider');
  }

  getAllProducts(){
      return this.http.get(this.serverUrl+'/products/getAll')
  }

  getUserProducts(){
    return this.http.get(this.serverUrl+'/products/getUserProducts', {headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }

  createProduct(product){
    return this.http.post(this.serverUrl+'/products/createProduct', product, {headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }

  updateProduct(product){
      return this.http.put(this.serverUrl+'/products/updateProduct', product,{headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }

  deleteProduct(product){
      return this.http.post(this.serverUrl+'/products/deleteProduct', product, {headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }

}
