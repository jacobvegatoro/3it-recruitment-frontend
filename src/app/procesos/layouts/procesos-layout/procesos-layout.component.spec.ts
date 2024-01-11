import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesosLayoutComponent } from './procesos-layout.component';

describe('ProcesosLayoutComponent', () => {
  let component: ProcesosLayoutComponent;
  let fixture: ComponentFixture<ProcesosLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcesosLayoutComponent]
    });
    fixture = TestBed.createComponent(ProcesosLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
