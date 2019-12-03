import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechTextPage } from './speech-text.page';

describe('SpeechTextPage', () => {
  let component: SpeechTextPage;
  let fixture: ComponentFixture<SpeechTextPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechTextPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechTextPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
