import { NativeStorage } from '@ionic-native/native-storage';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenProvider {

  public token:string="";

  constructor(private nativeStorage:NativeStorage) {
    console.log('Hello TokenProvider Provider');
  }

  getToken(){
    this.token="";
    this.nativeStorage.getItem('userToken')
    .then((data) => 
                this.token = data,
          (err) => console.log(err)
        );  
    return this.token;
    }

    removeToken(){
      this.nativeStorage.remove('userToken');
      this.token="";
    }
  }
