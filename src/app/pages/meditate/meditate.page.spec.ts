import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeditatePage } from './meditate.page';

describe('MeditatePage', () => {
  let component: MeditatePage;
  let fixture: ComponentFixture<MeditatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeditatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeditatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
