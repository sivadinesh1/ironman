import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedDivPage } from './animated-div.page';

describe('AnimatedDivPage', () => {
  let component: AnimatedDivPage;
  let fixture: ComponentFixture<AnimatedDivPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedDivPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedDivPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
