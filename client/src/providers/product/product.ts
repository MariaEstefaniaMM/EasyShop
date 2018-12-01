import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenProvider } from '../token/token';
import { Product } from '../../models/product';

@Injectable()
export class ProductProvider {

  serverUrl:string = "http://localhost:3000";
  //serverUrl:string = "http://192.168.43.114:3000";
  products:Product[];
  userProducts: Product[];
  category=[
    { id:1,  title: 'Clothes'},
    { id:2, title: 'Shoes'},
    { id:3, title: 'Accessories'},
  ];

  constructor(public http: HttpClient,private tokenProvider: TokenProvider) {
    console.log('Hello ProductProvider Provider');
  }

  getAllProducts(){
      return this.http.get(this.serverUrl+'/products/getAll').subscribe((res:any) => {
        if (res.status==200){
          this.products=[];
          this.products=res.products;
          //this.products.sort()
          console.log(this.products);
        }else{
          console.log(res.message);
        }
      }), (err) => {
        console.log(err);
      }
  }

  getUserProducts(){
    return this.http.get(this.serverUrl+'/products/getUserProducts', {headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
    .subscribe((res:any) => {
      if (res.status==200){
        console.log(res);
        this.userProducts=[];
        this.userProducts=res.products;
      }else{
        console.log(res.message);
      }
    }), (err) => {
      console.log(err);
    }
  }

  createProduct(product){
    return this.http.post(this.serverUrl+'/products/createProduct', product, {headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }

  updateProduct(product){
    console.log(product);
      return this.http.put(this.serverUrl+'/products/updateProduct', product,{headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }

  deleteProduct(product){
      return this.http.post(this.serverUrl+'/products/deleteProduct', product, {headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }

}
