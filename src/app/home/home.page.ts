import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  sampleArr=[];
  resultArr=[];

  constructor(
    public fs: AngularFirestore,
     public router: Router,
    ) { }

  ngOnInit() {
  }

 

  search(event){
    let searchKey=event.target.value;
    let firstLetter=searchKey.toUpperCase();

    if(searchKey.length==0){
      this.sampleArr=[];
      this.resultArr=[];
    }

    if(this.sampleArr.length==0){
        this.fs.collection('videos',ref => ref.where('SearchIndex', '==', firstLetter )).snapshotChanges()
        .subscribe(data=>{
          data.forEach(childData => {
            this.sampleArr.push(childData.payload.doc.data())
          })
        })
    }
    else{
      this.resultArr=[];
      this.sampleArr.forEach(val=>{
          let name:string=val['Name'];
          if(name.toUpperCase().startsWith(searchKey.toUpperCase())){
            if(true){
              this.resultArr.push(val);
            }
          }
      })
    }
  }

  goVid(){
    this.router.navigate(['/login'])
  }
}
