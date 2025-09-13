import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-selected-election-message',
  templateUrl: './no-selected-election-message.component.html',
  styleUrls: ['./no-selected-election-message.component.scss'],
})
export class NoSelectedElectionMessageComponent {
  @Input() condition: boolean = false;

  constructor() {
    // empty constructor
  }
}
