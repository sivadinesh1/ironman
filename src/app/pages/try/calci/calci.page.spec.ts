import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalciPage } from './calci.page';

describe('CalciPage', () => {
  let component: CalciPage;
  let fixture: ComponentFixture<CalciPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalciPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalciPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
