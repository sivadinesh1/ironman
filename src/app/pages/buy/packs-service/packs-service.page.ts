import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyPacksService } from 'src/app/services/buy-packs.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-service-packs',
  templateUrl: './packs-service.page.html',
  styleUrls: ['./packs-service.page.scss'],
})
export class PacksServicePage implements OnInit {
  service_sub_category_id: any;
  servicepacks: any;
  serviceid: any;
  sessions: any;
  user_id: any;
  center_id: any;

  constructor(private route: ActivatedRoute, 
    private router: Router, private authenticationService: AuthenticationService,
    private buyservicePacks: BuyPacksService) {
    this.service_sub_category_id = this.route.snapshot.paramMap.get('subcategoryid');
    this.serviceid = this.route.snapshot.paramMap.get('serviceid');
    this.sessions = this.route.snapshot.paramMap.get('sessions');

    
   

    if (this.service_sub_category_id === '1') {
      this.servicepacks = this.buyservicePacks.getSilverPacks();
    }
  }

  async ngOnInit() {
    this.user_id = await this.authenticationService.getLocalStoreItems('USER_ID');
    this.center_id = await this.authenticationService.getLocalStoreItems('CENTER_ID');
  }

  isSelected(item) {

    if (item.service_id.toString() === this.serviceid) {
      return 'grey';
    }
  }

  choosePack(item) {
    console.log('object choose packs ' + JSON.stringify(item));
    this.sessions = item.sessions;
    this.serviceid = item.service_id.toString();
  }

  register() {
    this.router.navigate([`service/register/${this.serviceid}/${this.user_id}/${this.center_id}`]);
  }

}
