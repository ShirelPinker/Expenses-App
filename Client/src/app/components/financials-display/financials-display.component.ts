import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-financials-display',
  templateUrl: './financials-display.component.html',
  styleUrls: ['./financials-display.component.css']
})
export class FinancialsDisplayComponent {
  @Input() year : number | null = null;
  @Input() month: string  | null = null;
}
