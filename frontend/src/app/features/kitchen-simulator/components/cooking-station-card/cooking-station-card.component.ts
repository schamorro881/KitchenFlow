import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-cooking-station-card',
  standalone: true,
  imports: [],
  templateUrl: './cooking-station-card.component.html',
  styleUrl: './cooking-station-card.component.scss'
})
export class CookingStationCardComponent {
  stationId = input.required<number>();
  stationName = input<string>('Estacion Desconocida');
  temperature = input<number>(0);

  turnOff = output<number>();

  onTurnOffClick() {
    this.turnOff.emit(this.stationId());
  }

}
