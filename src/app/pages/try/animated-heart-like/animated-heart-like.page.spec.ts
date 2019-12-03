import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedHeartLikePage } from './animated-heart-like.page';

describe('AnimatedHeartLikePage', () => {
  let component: AnimatedHeartLikePage;
  let fixture: ComponentFixture<AnimatedHeartLikePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedHeartLikePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedHeartLikePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
