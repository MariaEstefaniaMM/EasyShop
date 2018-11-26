import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenProvider } from '../token/token';

@Injectable()
export class CommentProvider {

  serverUrl:string = "http://192.168.0.102:3000";
  productComments=[];
  commentResponses=[];

  constructor(public http: HttpClient,private tokenProvider: TokenProvider) {
    console.log('Hello ProductProvider Provider');
  }

  getProductComments(id_product){
    return this.http.get(this.serverUrl+'/comments/getProductComments?id_product='+id_product, {headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
    .subscribe((res:any) => {
      if (res.status==200){
        console.log(res.comments.filter((comment:any)=>{return comment.id_first_comment===null}));
        this.productComments=res.comments.filter((comment:any)=>{return comment.id_first_comment===null})
        this.commentResponses=res.comments.filter((comment:any)=>{return comment.id_first_comment!==null})
        this.productComments.reverse();
      }else{
        console.log(res.message);
      }
    }), (err) => {
      console.log(err);
    }
  }

  createComment(comment){
    return this.http.post(this.serverUrl+'/comments/createComment', comment, {headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }

  updateComment(comment){
    console.log(comment);
      return this.http.put(this.serverUrl+'/comments/updateComment', comment,{headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }

  deleteComment(comment){
      return this.http.post(this.serverUrl+'/comments/deleteComment', comment, {headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }

}
