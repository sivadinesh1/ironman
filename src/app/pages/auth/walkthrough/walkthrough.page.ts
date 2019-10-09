import { Component, OnInit, AfterViewInit, ViewChild, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { IonSlides, MenuController } from '@ionic/angular';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: [
    './styles/walkthrough.page.scss',
    './styles/walkthrough.shell.scss',
    './styles/walkthrough.responsive.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalkthroughPage implements OnInit, AfterViewInit {
  slidesOptions: any = {
    zoom: {
      toggle: false // Disable zooming to prevent weird double tap zomming on slide images
    }
  };

  @ViewChild(IonSlides, { static: true }) slides: IonSlides;

  @HostBinding('class.first-slide-active') isFirstSlide = true;

  @HostBinding('class.last-slide-active') isLastSlide = false;

  private unsubscribe$ = new SubSink();
  constructor(public menu: MenuController, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.menu.enable(false);
  }

  ngAfterViewInit(): void {


    // ViewChild is set
    this.slides.isBeginning().then(isBeginning => {
      this.isFirstSlide = isBeginning;
      this.cdr.markForCheck();
    });
    this.slides.isEnd().then(isEnd => {
      this.isLastSlide = isEnd;
      this.cdr.markForCheck();
    });

    // Subscribe to changes
    this.unsubscribe$.sink = this.slides.ionSlideWillChange.subscribe(changes => {
      this.slides.isBeginning().then(isBeginning => {
        this.isFirstSlide = isBeginning;
        this.cdr.markForCheck();
      });
      this.slides.isEnd().then(isEnd => {
        this.isLastSlide = isEnd;
        this.cdr.markForCheck();
      });
      this.cdr.markForCheck();
    });
  }

  skipWalkthrough(): void {
    // Skip to the last slide
    this.slides.length().then(length => {
      this.slides.slideTo(length);
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }


}
