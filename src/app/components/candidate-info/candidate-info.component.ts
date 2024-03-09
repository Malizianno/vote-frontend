import { Component, Input } from '@angular/core';
import { Candidate } from 'src/app/model/candidate.model';

@Component({
  selector: 'app-candidate-info',
  templateUrl: './candidate-info.component.html',
  styleUrls: ['./candidate-info.component.scss']
})
export class CandidateInfoComponent {
  @Input() candidate = new Candidate();

  constructor() {
    // empty constructor
  }

}
