import { CommentProvider } from './../../providers/comment/comment';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastController, AlertController, LoadingController, NavController } from 'ionic-angular';
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
    id_user:null,
    comment_text:"",
    id_first_comment:null,
  };
  loading:any;
  readonlyComment:boolean=true;
  show:boolean=false;
  commentResponses;
  @Input() owner;
  @Input() comment;
  @Output() commentDeleted: EventEmitter<any> = new EventEmitter<any>();
  ownerComment:boolean;

  constructor(private alertCtrl: AlertController, public toastCtrl: ToastController, public commentProvider: CommentProvider,
              public userProvider:UserProvider, public loadingCtrl: LoadingController) {
    console.log('Hello CommentsComponent Component'); 
    //console.log('Hello CommentsComponent Component', this.ownerComment, this.comment);
    //this.commentResponses= this.commentResponses.filter((comment:any)=>{return comment.id_first_comment===this.comment.id_comment})
  }

  enableInput(comment){
    this.readonlyComment=false;
    this.originalComment=JSON.parse(JSON.stringify(comment));
  }

  enableInputR(comment){
    comment.readonly=false;
    console.log(comment);
    this.originalComment=JSON.parse(JSON.stringify(comment));
  }

  showResponses(){
    this.show=!this.show;
    this.commentResponses= this.commentProvider.productComments.filter((comment:any)=>{return comment.id_first_comment===this.comment.id_comment})
    for (var i=0;i<this.commentResponses.length;i++){
      this.commentResponses[i]["readonly"]=true;
      console.log(this.commentResponses[i].readonly)
    }
    console.log( this.commentResponses);
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
            console.log('delete clicked');
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
          console.log(this.commentProvider.productComments.indexOf(comment));
          if(this.commentProvider.productComments.indexOf(comment)>-1){
              this.commentProvider.productComments.splice(this.commentProvider.productComments.indexOf(comment),1);
          }
          if(this.commentResponses){
            if(this.commentResponses.indexOf(comment)>-1){
            this.commentResponses.splice(this.commentProvider.productComments.indexOf(comment),1);
          }
          }
          
          this.commentDeleted.emit(comment);
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
          this.readonlyComment=true; 
          comment.readonly=true;  
          this.toast(res.message);
          this.showLoader();
      }else{
        this.comment=this.originalComment;
        this.errorAlert(res.message);
      }
    }), (err) => {
      this.errorAlert(JSON.stringify(err)); 
    }
    }else{
      this.readonlyComment=true; 
      comment.readonly=true; 
    }
  }

  cancelComment(){
    console.log('cancel');
  }

  createComment(){
    if(this.response.comment_text!==""){
    this.response.id_product=this.comment.id_product;
    this.response.id_first_comment=this.comment.id_comment;
    this.response.id_user=this.userProvider.user.id_user;
    console.log(this.response);
    this.commentProvider.createComment(this.response).subscribe((res:any) => {
      if (res.status==200){
          console.log(res);    
          this.toast(res.message);
          this.response.id_comment=res.data.id_comment;
          this.response["readonly"]=true;
          this.response["username"]=this.userProvider.user.username;
          this.commentProvider.productComments.push(JSON.parse(JSON.stringify(this.response)));
          this.commentResponses.push(JSON.parse(JSON.stringify(this.response)));
          this.response={
            id_comment:null,
            id_product:null,
            id_user:null,
            comment_text:"",
            id_first_comment:null
          };
      }else{
        this.errorAlert(res.message);
      }
    }), (err) => {
      this.errorAlert(JSON.stringify(err)); 
    }
  }
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...'
    });
  
    this.loading.present();
  
    setTimeout(() => {
      console.log('created')
    }, 1000);
  
    setTimeout(() => {
      this.loading.dismiss();
    }, 2000);
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
