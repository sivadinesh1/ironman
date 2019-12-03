import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollAnimatePage } from './scroll-animate.page';

describe('ScrollAnimatePage', () => {
  let component: ScrollAnimatePage;
  let fixture: ComponentFixture<ScrollAnimatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollAnimatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollAnimatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
