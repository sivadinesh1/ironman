import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private _modalcontroller: ModalController,
    private _authservice: AuthenticationService,
    private _setupapiservice: SetupApiService) {
    // console.log(navParams.get('firstName'));
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
  }

  dismiss(item) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this._modalcontroller.dismiss({
      'chosenserviec': 'pt',
    }, 'close');
  }

}
