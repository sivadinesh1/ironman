import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ResolvedCorporate } from './resolved-corporate-model';
import { ICorporates } from '../corporates';


@Component({
  selector: 'app-list-corporates',
  templateUrl: './list-corporates.page.html',
  styleUrls: ['./list-corporates.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCorporatesPage implements OnInit {

  error: any;
  listofcorporates: any;
  items = ['apple', 'banana', 'cherry'];


  constructor(private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef) {

    const resolvedCorporate: ResolvedCorporate = this.route.snapshot.data['corporatelist'];
    if (resolvedCorporate.error == null) {
      this.listofcorporates = resolvedCorporate.corporateList.obj;


    } else {
      this.error = resolvedCorporate.error;
    }

    this.cdr.markForCheck();

  }

  ngOnInit() {
  }

  // navigate(data) {
  //   this.router.navigate(['/app/edit-corporates/', JSON.stringify(data)]);
  // }

  navigate(item) {



    const corporate: ICorporates = <ICorporates>{
      id: item.id,
      name: item.name,
      line1: item.details.address.line1,
      line2: item.details.address.line2,
      state: item.details.address.state,
      pincode: item.details.address.pincode,
      phone: item.details.contacts.phone,
      email: item.details.contacts.email,
    };


    let navigationExtras: NavigationExtras = {
      state: { corporate }
    };


    this.router.navigate(['/app/edit-corporates/'], navigationExtras
    );
  }

}

