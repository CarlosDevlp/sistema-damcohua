import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenerFichaMedicaComponent } from './mantener-ficha-medica.component';

describe('MantenerFichaMedicaComponent', () => {
  let component: MantenerFichaMedicaComponent;
  let fixture: ComponentFixture<MantenerFichaMedicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenerFichaMedicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenerFichaMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
