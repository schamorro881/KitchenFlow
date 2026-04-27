import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenSimulatorComponent } from './kitchen-simulator.component';

describe('KitchenSimulatorComponent', () => {
  let component: KitchenSimulatorComponent;
  let fixture: ComponentFixture<KitchenSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitchenSimulatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitchenSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
