import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMcPage } from './edit-mc.page';

describe('EditMcPage', () => {
  let component: EditMcPage;
  let fixture: ComponentFixture<EditMcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMcPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
