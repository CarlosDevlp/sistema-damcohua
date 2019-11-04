import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenerEmpleadoComponent } from './mantener-empleado.component';

describe('MantenerEmpleadoComponent', () => {
  let component: MantenerEmpleadoComponent;
  let fixture: ComponentFixture<MantenerEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenerEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenerEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
