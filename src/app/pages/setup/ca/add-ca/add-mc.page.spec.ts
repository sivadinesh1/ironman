import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMcPage } from './add-ca.page';

describe('AddMcPage', () => {
  let component: AddMcPage;
  let fixture: ComponentFixture<AddMcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMcPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
