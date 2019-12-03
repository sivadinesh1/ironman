import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCentersPage } from './add-centers.page';

describe('AddCentersPage', () => {
  let component: AddCentersPage;
  let fixture: ComponentFixture<AddCentersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCentersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCentersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
