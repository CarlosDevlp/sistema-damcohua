import { TestBed } from '@angular/core/testing';

import { TiposOpcionesService } from './tipos-opciones.service';

describe('TiposOpcionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TiposOpcionesService = TestBed.get(TiposOpcionesService);
    expect(service).toBeTruthy();
  });
});
