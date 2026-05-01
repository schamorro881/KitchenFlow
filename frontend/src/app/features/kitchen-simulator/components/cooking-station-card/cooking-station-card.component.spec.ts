import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookingStationCardComponent } from './cooking-station-card.component';

describe('CookingStationCardComponent', () => {
  let component: CookingStationCardComponent;
  let fixture: ComponentFixture<CookingStationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookingStationCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookingStationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
