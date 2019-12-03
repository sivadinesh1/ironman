import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalNotificationPage } from './local-notification.page';

describe('LocalNotificationPage', () => {
  let component: LocalNotificationPage;
  let fixture: ComponentFixture<LocalNotificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalNotificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalNotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
