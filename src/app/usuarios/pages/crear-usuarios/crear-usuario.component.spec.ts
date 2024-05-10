import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUsuarioComponent } from './crear-usuario.component';

describe('UsuariosComponent', () => {
  let component: CrearUsuarioComponent;
  let fixture: ComponentFixture<CrearUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearUsuarioComponent]
    });
    fixture = TestBed.createComponent(CrearUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
