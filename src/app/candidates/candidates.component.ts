import { Component } from '@angular/core';
import { Candidate } from '../model/candidate.model';
import { CandidateService } from '../services/candidates.service';
import { map } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCandidateComponent } from './add/add-candidate.modal';
import { Paging } from '../model/paging.model';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent {
  candidates: Candidate[] = [];

  filter = new Candidate();
  paging = new Paging();
  totalCandidates = 0;

  constructor(
    private service: CandidateService,
    private modalService: NgbModal,
  ) {
    this.reloadPage();
  }

  reloadPage() {
    this.getFiltered().subscribe();
  }

  onPageChange($event: number) {
    this.paging.page = $event;
    this.reloadPage();
  }

  add() {
    // open modal to add new candidate
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

  getFiltered() {
    return this.service.getFiltered(this.filter, this.paging).pipe(map((res) => {
      if (res?.candidates) {
        this.candidates = Candidate.fromArray(res.candidates);
        this.totalCandidates = res.total;
        // console.log('canidates: ', this.candidates);
        // console.log('total candidates: ', this.totalCandidates);
      }
    }));
  }
}
