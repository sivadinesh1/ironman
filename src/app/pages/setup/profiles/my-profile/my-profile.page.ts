import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonApiService } from 'src/app/services/common-api.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyProfilePage implements OnInit {

  userobj: any;
  trainerdetails: any;

  constructor(private _authservice: AuthenticationService, private _cdr: ChangeDetectorRef,
    private commonApiService: CommonApiService) {

    console.log('object..' + this._authservice.usrobj);

    this.userobj = this._authservice.usrobj;
    this._cdr.markForCheck();
  }

  ngOnInit() {
    if (this.userobj.role === 'trainer') {
      this.commonApiService.getTrainerDetails(this.userobj.id).subscribe((trainerdetails: any) => {
        this.trainerdetails = trainerdetails.obj;


        this._cdr.markForCheck();
      }
      );
    }

  }




}
