import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEntrevistasComponent } from './listado-entrevistas.component';

describe('ListadoEntrevistasComponent', () => {
  let component: ListadoEntrevistasComponent;
  let fixture: ComponentFixture<ListadoEntrevistasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoEntrevistasComponent]
    });
    fixture = TestBed.createComponent(ListadoEntrevistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
