import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCelulasComponent } from './listado-celulas.component';

describe('ListadoCelulasComponent', () => {
  let component: ListadoCelulasComponent;
  let fixture: ComponentFixture<ListadoCelulasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoCelulasComponent]
    });
    fixture = TestBed.createComponent(ListadoCelulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
