import { ComponentFixture, TestBed } from '@angular/core/testing';

import { crearClienteComponent } from './crear-cliente.component';

describe('crearClienteComponent', () => {
  let component: crearClienteComponent;
  let fixture: ComponentFixture<crearClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [crearClienteComponent]
    });
    fixture = TestBed.createComponent(crearClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
