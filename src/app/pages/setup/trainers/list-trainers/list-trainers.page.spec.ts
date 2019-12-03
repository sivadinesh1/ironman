import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrainersPage } from './list-trainers.page';

describe('ListTrainersPage', () => {
  let component: ListTrainersPage;
  let fixture: ComponentFixture<ListTrainersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTrainersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTrainersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
