import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCropPage } from './image-crop.page';

describe('ImageCropPage', () => {
  let component: ImageCropPage;
  let fixture: ComponentFixture<ImageCropPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCropPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCropPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
