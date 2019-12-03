import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCentersPage } from './edit-centers.page';

describe('EditCentersPage', () => {
  let component: EditCentersPage;
  let fixture: ComponentFixture<EditCentersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCentersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCentersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
