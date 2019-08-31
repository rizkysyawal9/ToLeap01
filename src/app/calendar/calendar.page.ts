import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { formatDate } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  constructor(
    private alertCtrl: AlertController, 
    @Inject(LOCALE_ID)private locale: string, 
    private db: AngularFirestore,
    public user: UserService) {
      /*this.db.collection['events'].snapshotChanges().subscribe(colSnap => {
        colSnap.forEach|snap => {
          let event = snap.paylead.doc.data();
        }
      })*/
      this.eventSource = [];
      this.db.collection('eventCopy').snapshotChanges().subscribe(colSnap => {
        colSnap.forEach(snap => {
            let eventCopy:any = snap.payload.doc.data();
            eventCopy.id = snap.payload.doc.id;
            eventCopy.startTime = eventCopy.startTime.toDate();
            eventCopy.endTime = eventCopy.endTime.toDate();
            this.eventSource.push(eventCopy);
        })
      })
     }

  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };

  minDate = new Date().toISOString();

  eventSource = [];

  calendar = {
    mode: 'week',
    currentDate: new Date()
  }

  viewTitle = '';

  @ViewChild(CalendarComponent, {static: false}) myCal: CalendarComponent;

 async onEventSelected(event){
    let start = formatDate(event.startTime, 'medium',this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title, 
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
  }

  onViewTitleChanged(title){
    this.viewTitle = title;
  }

  onTimeSelected(ev){
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours()+1);
    this.event.endTime = (selected.toISOString());
  }

  onCurrentDateChanged(){

  }

  ngOnInit() {
    this.resetEvent();
  }

  resetEvent(){
    this.event = {
      title: '',
    desc: '',
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    allDay: false
    }
  }

  changeMode(mode){
    this.calendar.mode = mode;
  }

  next(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  today(){
    this.calendar.currentDate = new Date();
  }

/*  addEvent(){
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }

    if(eventCopy.allDay){
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
      
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(),start.getUTCDate()));
      eventCopy.startTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(),end.getUTCDate()+1));
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();

    this.db.collection(`calendar/${this.user.getUID()}/events`).add(event);
  } */

  addEvent(){
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }

    if(eventCopy.allDay){
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
      
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(),start.getUTCDate()));
      eventCopy.startTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(),end.getUTCDate()+1));
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();

    this.db.collection(`calendar/${this.user.getUID()}/events`).add(eventCopy);
  }

  deleteEvent(){
    this.db.collection(`calendar/${this.user.getUID()}/events`).doc().delete();
  }
}
