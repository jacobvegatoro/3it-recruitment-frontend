import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelDeAdministracionComponent } from './panel-de-administracion.component';


describe('PanelDeAdministracionComponent', () => {
  let component: PanelDeAdministracionComponent;
  let fixture: ComponentFixture<PanelDeAdministracionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelDeAdministracionComponent]
    });
    fixture = TestBed.createComponent(PanelDeAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
