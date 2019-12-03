import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCentersPage } from './list-centers.page';

describe('ListCentersPage', () => {
  let component: ListCentersPage;
  let fixture: ComponentFixture<ListCentersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCentersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCentersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
