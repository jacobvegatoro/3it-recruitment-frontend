import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePostulanteComponent } from './detalle-postulante.component';

describe('DetallePostulanteComponent', () => {
  let component: DetallePostulanteComponent;
  let fixture: ComponentFixture<DetallePostulanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallePostulanteComponent]
    });
    fixture = TestBed.createComponent(DetallePostulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
