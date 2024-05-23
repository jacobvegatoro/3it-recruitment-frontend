import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCelulaComponent } from './crear-celula.component';

describe('CrearCelulaComponent', () => {
  let component: CrearCelulaComponent;
  let fixture: ComponentFixture<CrearCelulaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearCelulaComponent]
    });
    fixture = TestBed.createComponent(CrearCelulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
