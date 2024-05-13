import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteLayoutComponent } from './cliente-layout.component';

describe('ClienteLayoutComponent', () => {
  let component: ClienteLayoutComponent;
  let fixture: ComponentFixture<ClienteLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteLayoutComponent]
    });
    fixture = TestBed.createComponent(ClienteLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
