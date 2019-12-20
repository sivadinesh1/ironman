import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAnimatePage } from './card-animate.page';

describe('CardAnimatePage', () => {
  let component: CardAnimatePage;
  let fixture: ComponentFixture<CardAnimatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardAnimatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAnimatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
