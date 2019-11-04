import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenerCitaComponent } from './mantener-cita.component';

describe('MantenerCitaComponent', () => {
  let component: MantenerCitaComponent;
  let fixture: ComponentFixture<MantenerCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenerCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenerCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
