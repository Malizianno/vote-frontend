import { Component } from '@angular/core';
import { Candidate } from '../model/candidate.model';
import { CandidateService } from '../services/candidates.service';
import { map } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCandidateComponent } from './add/add-candidate.modal';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent {
  candidates: Candidate[] = [];

  constructor(
    private service: CandidateService,
    private modalService: NgbModal,
  ) {
    this.reloadPage();
  }

  reloadPage() {
    this.getAll().subscribe();
  }

  add() {
    // open modal to add new candidate
    console.log('add was pressed!');

    const modalref = this.modalService.open(AddCandidateComponent);

    modalref.result.then((res: Candidate) => {
      if (null != res.id) {
        console.log('candidate ' + res.id + ' was saved successfully!');
        this.reloadPage();
      }
    })
  }

  delete(id: number) {
    return this.service.delete(id).subscribe((res) => {
      if (res) {
        console.log('Candidate ' + id + ' deleted successfully!');
        this.reloadPage();
      }
    });
  }

  getAll() {
    return this.service.getAll().pipe(map((res) => {
      if (res) {
        this.candidates = Candidate.fromArray(res);
      }
    }));
  }
}
