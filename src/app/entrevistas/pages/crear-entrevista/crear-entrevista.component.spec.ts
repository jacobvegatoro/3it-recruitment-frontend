import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEntrevistaComponent } from './crear-entrevista.component';

describe('CrearEntrevistaComponent', () => {
  let component: CrearEntrevistaComponent;
  let fixture: ComponentFixture<CrearEntrevistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearEntrevistaComponent]
    });
    fixture = TestBed.createComponent(CrearEntrevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
