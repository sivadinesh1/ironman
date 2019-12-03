import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainersPage } from './add-trainers.page';

describe('AddTrainersPage', () => {
  let component: AddTrainersPage;
  let fixture: ComponentFixture<AddTrainersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTrainersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrainersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
