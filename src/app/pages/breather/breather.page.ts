import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-breather',
  templateUrl: './breather.page.html',
  styleUrls: ['./breather.page.scss'],
})
export class BreatherPage implements OnInit {


  @ViewChild('circle', { static: true }) circle;

  constructor(private renderer: Renderer2) {

  }

  ngOnInit() {

  }


  startAnimate() {
    this.renderer.addClass(this.circle.nativeElement, "animatecircle");
  }

  stopAnimate() {
    this.renderer.removeClass(this.circle.nativeElement, "animatecircle");
  }

}
