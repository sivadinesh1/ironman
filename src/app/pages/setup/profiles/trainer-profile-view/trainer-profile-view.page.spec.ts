import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerProfileViewPage } from './trainer-profile-view.page';

describe('TrainerProfileViewPage', () => {
  let component: TrainerProfileViewPage;
  let fixture: ComponentFixture<TrainerProfileViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerProfileViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerProfileViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
