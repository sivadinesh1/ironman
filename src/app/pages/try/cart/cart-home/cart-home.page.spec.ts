import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartHomePage } from './cart-home.page';

describe('CartHomePage', () => {
  let component: CartHomePage;
  let fixture: ComponentFixture<CartHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
