import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasLayoutComponent } from './preguntas-layout.component';

describe('PreguntasLayoutComponent', () => {
  let component: PreguntasLayoutComponent;
  let fixture: ComponentFixture<PreguntasLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreguntasLayoutComponent]
    });
    fixture = TestBed.createComponent(PreguntasLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
