import { Component, OnInit } from '@angular/core';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-video1',
  templateUrl: './video1.page.html',
  styleUrls: ['./video1.page.scss'],
})
export class Video1Page implements OnInit {

  constructor( 
    private youtube: YoutubeVideoPlayer,
    public fs: AngularFirestore
    ) { }

  ngOnInit() {
  }

  openMyVideo(id){
    this.youtube.openVideo(id);
  }

}
