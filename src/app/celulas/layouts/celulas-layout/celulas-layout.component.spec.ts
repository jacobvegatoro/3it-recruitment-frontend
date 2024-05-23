import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelulasLayoutComponent } from './celulas-layout.component';

describe('CelulasLayoutComponent', () => {
  let component: CelulasLayoutComponent;
  let fixture: ComponentFixture<CelulasLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CelulasLayoutComponent]
    });
    fixture = TestBed.createComponent(CelulasLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
