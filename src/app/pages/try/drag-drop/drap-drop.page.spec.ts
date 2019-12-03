import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrapDropPage } from './drag-drop.page';

describe('DrapDropPage', () => {
  let component: DrapDropPage;
  let fixture: ComponentFixture<DrapDropPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrapDropPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrapDropPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
