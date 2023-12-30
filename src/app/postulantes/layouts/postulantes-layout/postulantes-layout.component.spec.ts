import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulantesLayoutComponent } from './postulantes-layout.component';

describe('PostulantesLayoutComponent', () => {
  let component: PostulantesLayoutComponent;
  let fixture: ComponentFixture<PostulantesLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostulantesLayoutComponent]
    });
    fixture = TestBed.createComponent(PostulantesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
