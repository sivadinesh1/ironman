import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSpeechPage } from './text-speech.page';

describe('TextSpeechPage', () => {
  let component: TextSpeechPage;
  let fixture: ComponentFixture<TextSpeechPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextSpeechPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSpeechPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
