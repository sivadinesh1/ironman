import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SetupApiService } from 'src/app/pages/setup/setup-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-packages',
  templateUrl: './view-packages.page.html',
  styleUrls: ['./view-packages.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewPackagesPage implements OnInit {
  listservices: any;
  category_id: any;

  sessions: any;
  serviceid: any;

  @ViewChild('btn', { read: ElementRef, static: true }) buttonArea: ElementRef;
  @ViewChild('txt', { read: ElementRef, static: true }) txt: ElementRef;

  constructor(private _authservice: AuthenticationService, private _setupapiservice: SetupApiService,
    private _cdr: ChangeDetectorRef, private renderer: Renderer2, private _router: Router,
    private _route: ActivatedRoute) {
    this._route.paramMap.subscribe(params => {

      this.category_id = +params.get('id');
    });

  }

  choosePack(item) {
    console.log('object choose packs ' + JSON.stringify(item));
    this.sessions = item.sessions;
    this.serviceid = item.id.toString();
  }

  ngOnInit() {
    this._setupapiservice.getServices('Y', this._authservice.center.id, this.category_id).subscribe((data: any) => {
      this.listservices = data.obj;
      // debugger;
      this._cdr.markForCheck();
    });
  }

  isSelected(item) {
    
    if (item.id.toString() === this.serviceid) {
      return 'grey';
    }
  }

  register() {


    // this.renderer.addClass(this.contentArea.nativeElement, "transform-floatingbtn");
    this.renderer.addClass(this.buttonArea.nativeElement, "transform-floatingbtn");
    this.renderer.setStyle(this.txt.nativeElement, 'display', 'none');


    // this.router.navigate([`service/register/${this.serviceid}/${this.user_id}/${this.center_id}`]);
  }

  goback() {
    this._router.navigate([`/add-enquiry`]);
  }

}
