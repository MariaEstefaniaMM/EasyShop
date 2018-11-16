import { TokenProvider } from './../../providers/token/token';
import { UserProvider } from './../../providers/user/user';
import { User } from '../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-notes-list',
  templateUrl: 'notes-list.html',
})
export class NotesListPage {

  public isSearchbarOpened = false;
  
  //notes:Note [];
  myInput:string;
  user:User;
  password={old_password:'',new_password:''}

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider) {
                console.log('constructor');
                this.user=this.userProvider.user
  }

  ionViewWillEnter(){
    console.log('ionViewDidEnter NotesListPage');
    
  }

    /*goToNewNotes() {
      this.navCtrl.push(NotePage);
      console.log("aqui");
    }
    
    onInput(myInput){
      this.myInput=myInput;
        this.searchNotes = this.noteProvider.notes.filter((note) => {
          return note.note_title.toLowerCase().indexOf(myInput.toLowerCase()) > -1;
      }); 
    }*/

    updateUser(){
      this.userProvider.updateUser(this.user).subscribe((res:any) => {
        if (res.status==200){
          console.log("Modified");
        /*}else{
          this.note=this.originalNote;
          this.errorAlert(res.message);
        }*/
      }},
      (err) => {
        console.log(JSON.stringify(err)); 
    });
    }

    updatePassword(){
      this.userProvider.updatePassword(this.password).subscribe((res:any) => {
        if (res.status==200){
          console.log("Modified");
          console.log(res);
        /*}else{
          this.note=this.originalNote;
          this.errorAlert(res.message);
        }*/
      }},
      (err) => {
        console.log(JSON.stringify(err)); 
    });
    }
  
    deleteUser(){
      this.userProvider.deleteUser(this.user).subscribe((res:any) => {
        console.log('deleted');
          if (res.status==200){
            console.log(res);
            //this.userProvider.notes.splice(this.noteProvider.notes.indexOf(this.note),1);
            //this.toast('Note deleted');
            //this.navCtrl.setRoot(NotesListPage);
        }else{
          console.log(res.message)
          //this.errorAlert(res.message);
        }
        }, (err) => {
          console.log(err)
          //this.errorAlert(JSON.stringify(err));         
        }
        );
    }

}
