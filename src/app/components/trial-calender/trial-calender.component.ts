import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID, Renderer2 } from '@angular/core';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SetupApiService } from 'src/app/pages/setup/setup-api.service';

@Component({
  selector: 'app-trial-calender',
  templateUrl: './trial-calender.component.html',
  styleUrls: ['./trial-calender.component.scss'],
})
export class TrialCalenderComponent implements OnInit {

  event = {
    title: '',
    desc: '',
    starttime: '',
    endtime: '',
    allDay: false
  };

  minDate = new Date().toISOString();

  eventSource: any;
  viewTitle;
  show: any;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent, { static: true }) myCal: CalendarComponent;
  collapseCard: any;

  constructor(private alertCtrl: AlertController, private _navController: NavController,
    private _modalcontroller: ModalController,
    private _authservice: AuthenticationService, private renderer: Renderer2,
    private _setupapiservice: SetupApiService,
    @Inject(LOCALE_ID) private locale: string) {
    this.show = 'Show Less';
    this.collapseCard = false;

  }

  ngOnInit() {
    this.resetEvent();


    // dnd need to fetch values from database. need to implement

    // let event4mdb = {
    //   title: 'fromdb',
    //   startTime: new Date(this.event.startTime),
    //   endTime: new Date(this.event.endTime),
    //   allDay: this.event.allDay,
    //   desc: 'wow test'
    // }


    // this.eventSource.push(event4mdb);
  }

  toggleTAappable() {
    this.collapseCard = !this.collapseCard;
    if (this.collapseCard) {
      this.show = 'Show More';
    } else {
      this.show = 'Show Less';
    }

  }

  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      starttime: new Date().toISOString(),
      endtime: new Date().toISOString(),
      allDay: false
    };
  }

  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      starttime: new Date(this.event.starttime),
      endtime: new Date(this.event.endtime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }

    if (eventCopy.allDay) {
      let start = eventCopy.starttime;
      let end = eventCopy.endtime;

      eventCopy.starttime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endtime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }

    // debugger;
    this.eventSource = eventCopy;
    // this.eventSource.push(eventCopy);
    this.confirm();
    // this.myCal.loadEvents();
    // this.resetEvent();
  }

  // Change current month/week/day
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.starttime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endtime = (selected.toISOString());
  }




  confirm() {

    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this._modalcontroller.dismiss({
      'trialinfo': this.eventSource,
    }, 'close');
  }

  closeModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this._modalcontroller.dismiss({
      'trialinfo': 'null',
    }, 'close');
  }

}