import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCelulaComponent } from './editar-celula.component';

describe('EditarCelulaComponent', () => {
  let component: EditarCelulaComponent;
  let fixture: ComponentFixture<EditarCelulaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarCelulaComponent]
    });
    fixture = TestBed.createComponent(EditarCelulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
