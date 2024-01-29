import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrevistasLayoutComponent } from './entrevistas-layout.component';

describe('EntrevistasLayoutComponent', () => {
  let component: EntrevistasLayoutComponent;
  let fixture: ComponentFixture<EntrevistasLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntrevistasLayoutComponent]
    });
    fixture = TestBed.createComponent(EntrevistasLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
