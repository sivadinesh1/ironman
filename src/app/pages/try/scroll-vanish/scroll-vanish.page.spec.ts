import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollVanishPage } from './scroll-vanish.page';

describe('ScrollVanishPage', () => {
  let component: ScrollVanishPage;
  let fixture: ComponentFixture<ScrollVanishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollVanishPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollVanishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
