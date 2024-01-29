import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoProcesosComponent } from './listado-procesos.component';

describe('ListadoProcesosComponent', () => {
  let component: ListadoProcesosComponent;
  let fixture: ComponentFixture<ListadoProcesosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoProcesosComponent]
    });
    fixture = TestBed.createComponent(ListadoProcesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
