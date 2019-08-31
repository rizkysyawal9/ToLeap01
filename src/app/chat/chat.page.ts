import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  text: string;
  chatRef: any;
  uid: string;
  username: string;

  constructor(public af: AngularFireAuth, public fs: AngularFirestore, public user: UserService) { 
    this.chatRef = this.fs.collection('chats',ref=>ref.orderBy('Timestamp')).valueChanges();
  }

  ngOnInit() {
  }

  send(){
    if(this.text !=' '){
      this.fs.collection('chats').add({
        Name: this.af.auth.currentUser.displayName,
        Message: this.text,
        UserID: this.user.getUID(),
        Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      this.text='';
    }
  }
}
