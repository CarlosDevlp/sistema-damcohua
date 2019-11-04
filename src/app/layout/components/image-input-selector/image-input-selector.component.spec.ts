import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageInputSelectorComponent } from './image-input-selector.component';

describe('ImageInputSelectorComponent', () => {
  let component: ImageInputSelectorComponent;
  let fixture: ComponentFixture<ImageInputSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageInputSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageInputSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
