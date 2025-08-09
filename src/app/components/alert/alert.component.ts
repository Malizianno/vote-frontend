import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() message = '';
  @Input() type: 'success' | 'danger' | 'warning' = 'warning';

  constructor() {
    // empty constructor
  }

  clearMessage() {
    this.message = '';
  }
}
