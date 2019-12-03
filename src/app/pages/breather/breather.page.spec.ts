import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreatherPage } from './breather.page';

describe('BreatherPage', () => {
  let component: BreatherPage;
  let fixture: ComponentFixture<BreatherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreatherPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreatherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
