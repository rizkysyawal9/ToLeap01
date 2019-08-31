import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { Router } from '@angular/router'
  
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userPosts: any;
  mainuser: AngularFirestoreDocument  
  sub
  posts
  username : string
  profilePic : string

  

  constructor(private afs: AngularFirestore, private user: UserService,   public router: Router,) {
    this.mainuser = afs.doc(`users/${user.getUID()}`)
    this.sub = this.mainuser.valueChanges().subscribe(event =>{
      this.posts = event.posts
      this.username = event.username
      this.profilePic = event.profilePic
    })
  }

  ngOnInit() {
  }

  logout(){
    this.router.navigate(['/login'])
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }
}

