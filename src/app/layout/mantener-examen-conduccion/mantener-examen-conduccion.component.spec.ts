import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenerExamenConduccionComponent } from './mantener-examen-conduccion.component';

describe('MantenerExamenConduccionComponent', () => {
  let component: MantenerExamenConduccionComponent;
  let fixture: ComponentFixture<MantenerExamenConduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenerExamenConduccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenerExamenConduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
