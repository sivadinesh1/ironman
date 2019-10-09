import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCorporatesPage } from './add-corporates.page';

describe('AddCorporatesPage', () => {
  let component: AddCorporatesPage;
  let fixture: ComponentFixture<AddCorporatesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCorporatesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCorporatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
