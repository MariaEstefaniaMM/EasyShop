import { CommentProvider } from './../../providers/comment/comment';
import { Component, Input } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'comments',
  templateUrl: 'comments.html'
})
export class CommentsComponent {

  text: string;
  originalComment;
  response={
    id_comment:null,
    id_product:null,
    comment_text:"",
    id_first_comment:null,
  };
  readonlyComment:boolean=true;
  readonlyResponse:boolean=true;
  show:boolean=false;
  @Input() comment;
  owner:boolean;

  constructor(private alertCtrl: AlertController, public toastCtrl: ToastController, public commentProvider: CommentProvider,
              public userProvider:UserProvider) {
    console.log('Hello CommentsComponent Component');            
    //this.owner= this.comment.id_user==this.userProvider.user.id_user
    //console.log('Hello CommentsComponent Component', this.ownerComment, this.comment);
    //this.commentResponses= this.commentResponses.filter((comment:any)=>{return comment.id_first_comment===this.comment.id_comment})
  }

  enableInput(comment){
    this.readonlyComment=false;
    this.originalComment=JSON.parse(JSON.stringify(comment));
  }

  enableInputR(comment){
    this.readonlyResponse=false;
    this.originalComment=JSON.parse(JSON.stringify(comment));
  }

  showResponses(){
    this.show=!this.show;
    this.commentProvider.commentResponses= this.commentProvider.commentResponses.filter((comment:any)=>{return comment.id_first_comment===this.comment.id_comment})
  }

  deleteAlert(comment){
    let alert = this.alertCtrl.create({
      title: 'Do you want delete this comment?',
      buttons: [
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: data =>{
            console.log('cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: data =>{
            console.log('cancel clicked');
            this.deleteComment(comment);
          }
        }
      ]
    });
    alert.present();
  }

  deleteComment(comment){
    this.commentProvider.deleteComment(comment).subscribe((res:any) => {
      console.log('deleted');
        if (res.status==200){
          console.log(res);
          this.commentProvider.productComments.splice(this.commentProvider.productComments.indexOf(comment),1);
          this.toast('Comment deleted');
      }else{
        this.errorAlert(res.message);
      }
      }, (err) => {
        this.errorAlert(JSON.stringify(err));         
      }
      );
  }

  updateComment(comment){
    if(JSON.stringify(this.originalComment)!==JSON.stringify(comment)){
    this.commentProvider.updateComment(comment).subscribe((res:any) => {
      if (res.status==200){
          console.log(res);    
          this.toast(res.message);
      }else{
        this.comment=this.originalComment;
        this.errorAlert(res.message);
      }
    }), (err) => {
      this.errorAlert(JSON.stringify(err)); 
    }
    }
  }

  createComment(){
    if(this.response.comment_text!==""){
    this.response.id_product=this.comment.id_product;
    this.response.id_first_comment=this.comment.id_comment;
    console.log(this.response);
    this.commentProvider.createComment(this.response).subscribe((res:any) => {
      if (res.status==200){
          console.log(res);    
          this.toast(res.message);
          this.response.id_comment=res.data.id_comment;
          this.commentProvider.commentResponses.push(this.response);
      }else{
        this.errorAlert(res.message);
      }
    }), (err) => {
      this.errorAlert(JSON.stringify(err)); 
    }
  }
  }

  errorAlert(message){
    (this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    })).present();  
  }

  toast(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() =>{
      console.log('dissmissed toast');
    });
    toast.present();
  }

}
