import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacksServicePage } from './packs-service.page';

describe('PacksServicePage', () => {
  let component: PacksServicePage;
  let fixture: ComponentFixture<PacksServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacksServicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacksServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
