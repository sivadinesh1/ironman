import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-meditate',
  templateUrl: './meditate.page.html',
  styleUrls: ['./meditate.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeditatePage implements OnInit {

  //rainsound = '../../assets/sounds/rain.mp3';
  _srcvideo = '/assets/video/rain.mp4';

  _srcaudio = '../../assets/sounds/rain.mp3';

  audio: any;


  state = 'stop';
  _src = '/assets/images/play.svg';

  currenttime: any;
  seconds: any;
  minutes: any;

  fakeDuration: any;
  //progress: any;

  // @ViewChild('video', {static: true}) myVideo: HTMLVideoElement;

  @ViewChild('myVideo', { static: true }) private myVideoRef: ElementRef;

  elapsed: any = {
    h: '00',
    m: '00',
    s: '00'
  }
  progress: any = 0;
  overallProgress: any = 0;
  percent: number = 0;
  radius: number = 100;
  // minutes: number = 1;
  // seconds: any = 10;
  timer: any = false;
  overallTimer: any = false;
  fullTime: any = '00:01:30';


  countDownTimer: any = false;
  timeLeft: any = {
    m: '00',
    s: '00'
  };
  remainingTime = `${this.timeLeft.m}:${this.timeLeft.s}`;


  constructor(private _cdr: ChangeDetectorRef) {
    this.fakeDuration = 300;
  }

  ngOnInit() {
    this.audio = new Audio();

    this.audio.src = this._srcaudio;
    this.audio.load();

    this.myVideoRef.nativeElement.play();
  }

  playAudio() {
    this.audio.play();
    this.audio.loop = true;
    this.state = 'play';
  }

  pauseAudio() {
    this.state = 'pause';
    this.audio.pause();

  }

  stopAudio() {
    this.audio.pause();
  }

  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }

  }

  actionBtn(duration) {
    this.fakeDuration = duration;
    if (this.state === 'stop') {

      this.audio.play();
      this.audio.loop = true;
      this.state = 'play';
      this._src = '/assets/images/pause.svg';

      this.audio.ontimeupdate = () => {
        this.currenttime = this.audio.currentTime;

        let elapsed = this.fakeDuration - this.currenttime;

        this.seconds = Math.floor(elapsed % 60);
        this.minutes = Math.floor(elapsed / 60);

        this.progress = Math.floor((this.currenttime / this.fakeDuration) * 100);

        if (this.currenttime >= this.fakeDuration) {
          this.audio.pause();
          this.audio.currentTime = 0;
          this._src = '/assets/images/play.svg';
          this.myVideoRef.nativeElement.pause();

        }

        this._cdr.markForCheck();
        this._cdr.detectChanges();
      }




    } else if (this.state === 'play') {
      this.audio.pause();
      this.state = 'stop';
      this._src = '/assets/images/play.svg';
      this.myVideoRef.nativeElement.pause();

    }
  }

}