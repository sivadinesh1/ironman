import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonApiService } from 'src/app/services/common-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trainer-profile-view',
  templateUrl: './trainer-profile-view.page.html',
  styleUrls: ['./trainer-profile-view.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerProfileViewPage implements OnInit {

  trainerid: any;
  trainerdetails: any;

  constructor(private _authservice: AuthenticationService, private _cdr: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private commonApiService: CommonApiService) {

    console.log('object..' + this._authservice.usrobj);

    this.trainerid = this._route.snapshot.paramMap.get('id');

    this._cdr.markForCheck();
  }

  ngOnInit() {
    
      this.commonApiService.getTrainerDetails(this.trainerid).subscribe((trainerdetails: any) => {
        this.trainerdetails = trainerdetails.obj;


        this._cdr.markForCheck();
      }
      );
    

  }




}
