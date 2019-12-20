import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPackagesPage } from './view-packages.page';

describe('ViewPackagesPage', () => {
  let component: ViewPackagesPage;
  let fixture: ComponentFixture<ViewPackagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPackagesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPackagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
