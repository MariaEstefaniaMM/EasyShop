import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenProvider } from '../token/token';

@Injectable()
export class NoteProvider {

  serverUrl:string = "http://192.168.43.54:3000";

  constructor(public http: HttpClient, private tokenProvider: TokenProvider) {
    console.log("Provider Note");
  }

  //headers = new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token);

  createNote(note){
      console.log("createNote", note, this.tokenProvider.token);
      return this.http.post(this.serverUrl+'/note/createNote', note, {headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }

  updateNote(note){
    console.log("updateNote");
      return this.http.put(this.serverUrl+'/note/updateNote', note, {headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)});
  }

  deleteNote(note){
    console.log("deleteNote", note);
      return this.http.post(this.serverUrl+'/note/deleteNote', note, {headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)})
  }

  getUserNotes() {
    console.log(this.tokenProvider.token);
      this.http.get(this.serverUrl+'/note/getUserNotes', {headers:new HttpHeaders().set("Authorization", "Bearer "+ this.tokenProvider.token)}).subscribe((res:any) => {
        if (res.status==200){
        console.log(res.notes);
        //this.notes=res.notes;
      }else{
        console.log(res.message);
      }
    }), (err) => {
      console.log(err);
    }
  }

}
