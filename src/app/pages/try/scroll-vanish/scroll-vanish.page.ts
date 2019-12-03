import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-vanish',
  templateUrl: './scroll-vanish.page.html',
  styleUrls: ['./scroll-vanish.page.scss'],
})
export class ScrollVanishPage implements OnInit {
  public tests = new Array(20);
  constructor() { }

  ngOnInit() {
  }

}
