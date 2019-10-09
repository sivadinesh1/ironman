import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCorporatesPage } from './edit-corporates.page';

describe('EditCorporatesPage', () => {
  let component: EditCorporatesPage;
  let fixture: ComponentFixture<EditCorporatesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCorporatesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCorporatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
