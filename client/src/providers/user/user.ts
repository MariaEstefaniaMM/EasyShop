import { User } from './../../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenProvider } from '../token/token';

@Injectable()
export class UserProvider {

  serverUrl:string = "http://localhost:3000";
  user:User;

  constructor(public http: HttpClient,private tokenProvider: TokenProvider) {
    console.log('Hello UsersProvider Provider');
  }

  createUser(user){
      return this.http.post(this.serverUrl+'/session/signup', user)
  }

  login(user){
      return this.http.post(this.serverUrl+'/session/login', user)
  }

  logout(user){
      return this.http.get(this.serverUrl+'/session/logout', user)
  }

  updateUser(user){
      return this.http.put(this.serverUrl+'/users/updateUser', user,{headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }

  updatePassword(password){
    return this.http.put(this.serverUrl+'/users/updatePassword', password,{headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }

  deleteUser(user){
      return this.http.post(this.serverUrl+'/users/deleteUser', user, {headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }
}
