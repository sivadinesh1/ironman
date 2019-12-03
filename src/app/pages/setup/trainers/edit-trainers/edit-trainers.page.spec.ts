import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrainersPage } from './edit-trainers.page';

describe('EditTrainersPage', () => {
  let component: EditTrainersPage;
  let fixture: ComponentFixture<EditTrainersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTrainersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTrainersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
