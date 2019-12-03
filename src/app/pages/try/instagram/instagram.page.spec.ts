import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramPage } from './instagram.page';

describe('InstagramPage', () => {
  let component: InstagramPage;
  let fixture: ComponentFixture<InstagramPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstagramPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstagramPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
