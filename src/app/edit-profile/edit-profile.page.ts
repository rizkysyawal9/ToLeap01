import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  mainuser: AngularFirestoreDocument
  sub
  username: string 
  profilePic: string

  @ViewChild('fileBtn', {static:true}) fileBtn: {
    nativeElement: HTMLInputElement
  }

  constructor(
    private http: Http, 
    private afs: AngularFirestore,
    private user: UserService
    ) { 
    this.mainuser = afs.doc(`users/${user.getUID()}`)
    this.sub = this.mainuser.valueChanges().subscribe(event =>{
      this.username = event.username
      this.profilePic = event.profilePic
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.sub.unsubscibe()
  }

  updateProfilePic(){
    this.fileBtn.nativeElement.click()
  }

  uploadPic(event){
      const files = event.target.files

      const data = new FormData()
      data.append('file', files[0])
      data.append('UPLOADCARE_STORE', '1')
      data.append('UPLOADCARE_PUB_KEY', 'ac21f244ad737716342e')
  
      this.http.post('https://upload.uploadcare.com/base/',data)
      .subscribe(event => {
       const uuid = event.json().file
       this.mainuser.update({
         profilePic: uuid
       })
    })
  }
}
