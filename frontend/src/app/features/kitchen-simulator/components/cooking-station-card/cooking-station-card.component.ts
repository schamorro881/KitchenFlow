import { Component, input, output, signal, inject } from '@angular/core';
import { KitchenService } from '../../services/kitchen.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-cooking-station-card',
  standalone: true,
  imports: [],
  template: `
<div class="station-card-container">
    <div class="station-card-inner" [class.hot]="temperature() > 200">
        <h3 class="station-title">{{ stationName() }}</h3>

        <div class="station-content">
            <div class="temperature-display">
                <span class="label">Potencia Termica</span>
                <span class="value" [class.error]="temperature() > 200" [class.info]="temperature() <= 200">
                    {{ temperature() }} C
                </span>
            </div>

            <div class="heat-meter">
                <div class="heat-fill"
                     [style.width.%]="(temperature() / 300) * 100">
                </div>
            </div>

            <div class="actions-section">
                <button
                    class="action-btn btn-cook"
                    [disabled]="isCooking()"
                    (click)="onCookClick()">
                    {{ isCooking() ? 'Cocinando...' : 'Iniciar Coccion' }}
                </button>

                <button
                    class="action-btn btn-off"
                    [disabled]="isCooking()"
                    (click)="onTurnOffClick()">
                    Desactivar Estacion
                </button>
            </div>
        </div>
    </div>
</div>
  `,
  styleUrl: './cooking-station-card.component.scss'
})
export class CookingStationCardComponent {
  stationId = input.required<number>();
  stationName = input<string>('Estacion Desconocida');
  temperature = input<number>(0);

  turnOff = output<number>();
  orderDish = output<{ dishName: string, time: number }>();

  isCooking = signal(false);
  private readonly kitchenService = inject(KitchenService);

  constructor() {
    this.kitchenService.mealReady$
      .pipe(
        takeUntilDestroyed(),
        filter(meal => meal.stationId === this.stationId())
      )
      .subscribe(() => {
        this.isCooking.set(false);
      });
  }

  onTurnOffClick() {
    this.turnOff.emit(this.stationId());
  }

  onCookClick() {
    this.isCooking.set(true);
    this.orderDish.emit({
      dishName: 'Pato a la Naranja',
      time: 5
    });
  }
}
