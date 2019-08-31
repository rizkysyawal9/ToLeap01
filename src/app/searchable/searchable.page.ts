import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-searchable',
  templateUrl: './searchable.page.html',
  styleUrls: ['./searchable.page.scss'],
})
export class SearchablePage implements OnInit {
  public goalList: any[];
  public loadedGoalList: any[];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.firestore.collection('goals').valueChanges().subscribe(goalList=>{
      this.goalList = goalList;
      this.loadedGoalList = goalList;

    });
  }

  initializeItems(): void{
    this.goalList = this.loadedGoalList;
  }

  filterList(evt){
    this.initializeItems();
    const searchTerm = evt.srcElement.value;

    if(!searchTerm){
      return;
    }

    this.goalList = this.goalList.filter(currentGoal =>{
      if (currentGoal.goalName && searchTerm){
        if(currentGoal.goalName.tolowerCase().indexOf(searchTerm.toLowerCase()) > -1){
          return true;
        }
        return false;
      }
    });
  }



}
