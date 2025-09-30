import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorcentajeGananciasLoteComponent } from './porcentaje-ganancias-lote.component';

describe('PorcentajeGananciasLoteComponent', () => {
  let component: PorcentajeGananciasLoteComponent;
  let fixture: ComponentFixture<PorcentajeGananciasLoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PorcentajeGananciasLoteComponent]
    });
    fixture = TestBed.createComponent(PorcentajeGananciasLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
