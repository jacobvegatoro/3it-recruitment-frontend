import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPostulantesComponent } from './tabla-postulantes.component';

describe('TablaPostulantesComponent', () => {
  let component: TablaPostulantesComponent;
  let fixture: ComponentFixture<TablaPostulantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaPostulantesComponent]
    });
    fixture = TestBed.createComponent(TablaPostulantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
