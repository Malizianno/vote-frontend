import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnChanges {
  @Input() message = '';
  @Input() type: 'success' | 'danger' | 'warning' = 'warning';

  constructor() {
    // empty constructor
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['message'] && this.message) {
      setTimeout(() => {
        this.message = '';
      }, 3000); // auto-hide after 3 seconds
    }
  }
}
