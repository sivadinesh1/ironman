import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SetupApiService } from 'src/app/pages/setup/setup-api.service';
import { AuthApiService } from 'src/app/pages/auth/authApi.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-services-card',
  templateUrl: './services-card.component.html',
  styleUrls: ['./services-card.component.scss'],
})
export class ServicesCardComponent implements OnInit {
  @Input() id: string;
  apiresponse: any;

  listservices: any;
  sessions: any;
  serviceid: any;
  disabled = true;

  chosenpack: any;

  @ViewChild('btn', { read: ElementRef, static: true }) buttonArea: ElementRef;
  @ViewChild('txt', { read: ElementRef, static: true }) txt: ElementRef;

  constructor(private _modalcontroller: ModalController,
    private _authservice: AuthenticationService, private renderer: Renderer2,
    private _setupapiservice: SetupApiService) {
    // console.log(navParams.get('firstName'));

  }

  choosePack(item) {
    console.log('object choose packs ' + JSON.stringify(item));
    this.sessions = item.sessions;
    this.serviceid = item.id.toString();
    this.disabled = false;
    this.chosenpack = item;
  }

  ngOnInit() {
    console.log('val of data > ' + this.id);

    // DND - both are correct
    this._setupapiservice.getServices('Y', this._authservice.center.id, this.id).subscribe((data: any) => {
      this.listservices = data.obj;

    });

    // this._setupapiservice.getServices('Y', '1', '1').subscribe(
    //   data => {
    //     this.listservices = data["obj"];
    //     debugger;
    //   });

    //one more way
    // this.category_id = data.get("obj")
  }

  confirm() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this._modalcontroller.dismiss({
      'chosenservice': this.chosenpack,
    }, 'close');
  }

  closeModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this._modalcontroller.dismiss({
      'chosenservice': 'null',
    }, 'close');
  }

  // test

  colorToggle(item) {

    if (item.id.toString() === this.serviceid) {
      return '#ffffff';
    }
  }


  //   styleObject(): Object {
  //     if (/** YOUR CONDITION TO SHOW THE STYLES*/  ){
  //         return {height: this.height,width: this.width}
  //     }
  //     return {}
  // }


  styleObject(item): Object {
    if (item.id.toString() === this.serviceid) {
      return { 'background-color': 'grey', 'color': '#ffffff' }
    }
    return {}
  }

  // register() {


  //   // this.renderer.addClass(this.contentArea.nativeElement, "transform-floatingbtn");
  //   this.renderer.addClass(this.buttonArea.nativeElement, "transform-floatingbtn");
  //   this.renderer.setStyle(this.txt.nativeElement, 'display', 'none');


  //   // this.router.navigate([`service/register/${this.serviceid}/${this.user_id}/${this.center_id}`]);
  // }



}
