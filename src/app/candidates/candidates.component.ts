import { Component } from '@angular/core';
import { Candidate } from '../model/candidate.model';
import { CandidateService } from '../services/candidates.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent {
  candidates: Candidate[] = [];

  constructor(private service: CandidateService) {
    this.getAll().subscribe();
  }

  getAll() {
    return this.service.getAll().pipe(map((res) => {
      if (res) {
        this.candidates = Candidate.fromArray(res);
      }
    }));
  }
}
