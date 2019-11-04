import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleClienteDataCardComponent } from './simple-cliente-data-card.component';

describe('SimpleClienteDataCardComponent', () => {
  let component: SimpleClienteDataCardComponent;
  let fixture: ComponentFixture<SimpleClienteDataCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleClienteDataCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleClienteDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
