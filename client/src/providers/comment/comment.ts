import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenProvider } from '../token/token';

@Injectable()
export class CommentProvider {

  serverUrl:string = "http://192.168.43.54:3000";
  productComments;

  constructor(public http: HttpClient,private tokenProvider: TokenProvider) {
    console.log('Hello ProductProvider Provider');
  }

  getProductComments(id_product){
    return this.http.get(this.serverUrl+'/products/getProductComments?id_product='+id_product, {headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
    .subscribe((res:any) => {
      if (res.status==200){
        console.log(res);
        this.productComments=[];
        this.productComments=res.comments;
      }else{
        console.log(res.message);
      }
    }), (err) => {
      console.log(err);
    }
  }

  createComment(comment){
    return this.http.post(this.serverUrl+'/products/createComment', comment, {headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }

  updateComment(comment){
    console.log(comment);
      return this.http.put(this.serverUrl+'/products/updateComment', comment,{headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }

  deleteComment(comment){
      return this.http.post(this.serverUrl+'/products/deleteComment', comment, {headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }

}
