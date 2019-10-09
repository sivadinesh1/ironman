import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuyPacksService {

  silverPacks: any;
  goldPacks: any;

  constructor() { }

  public setSilverPacks(data) {
   
    this.silverPacks = data;
  }

  public getSilverPacks() {
    return this.silverPacks;
  }

  public setGoldPacks(data) {
    this.goldPacks = data;
  }

  public getGoldPacks() {
    return this.goldPacks;
  }

}
