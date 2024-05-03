import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPreguntasComponent } from './listado-preguntas.component';

describe('ListadoPreguntasComponent', () => {
  let component: ListadoPreguntasComponent;
  let fixture: ComponentFixture<ListadoPreguntasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoPreguntasComponent]
    });
    fixture = TestBed.createComponent(ListadoPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
