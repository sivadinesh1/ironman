import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMcPage } from './list-ca.page';

describe('ListMcPage', () => {
  let component: ListMcPage;
  let fixture: ComponentFixture<ListMcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMcPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
