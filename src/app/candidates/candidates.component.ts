import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs';
import { Candidate } from '../model/candidate.model';
import { Paging } from '../model/paging.model';
import { CandidateService } from '../services/candidates.service';
import { PartyTypeEnum } from '../util/party-type.enum';
import { AddCandidateComponent } from './add/add-candidate.modal';
import { EditCandidateComponent } from './edit/edit-candidate.modal';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent {
  candidates: Candidate[] = [];
  parties = Object.keys(PartyTypeEnum).filter((v) => isNaN(Number(v)));

  filter = new Candidate();
  paging = new Paging();
  totalCandidates = 0;

  filterChangedSubject: Subject<string> = new Subject<string>();
  filterChangedSubscription!: Subscription;

  // DEBUG BUTTON
  showInfo = false;

  constructor(
    private service: CandidateService,
    private modalService: NgbModal
  ) {
    this.reloadPage();
    this.debounceSubscription();
  }

  reloadPage() {
    this.getFiltered().subscribe();
  }

  resetFilter() {
    this.filter = new Candidate();
    this.paging.page = 1;
    this.reloadPage();
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
        this.resetFilter();
      }
    });
  }

  edit(id: number) {
    // open modal to add new candidate
    const modalref = this.modalService.open(EditCandidateComponent);
    modalref.componentInstance.id = id; // pass the ID to the modal

    modalref.result.then((res: Candidate) => {
      if (null != res.id) {
        this.resetFilter();
      }
    });
  }

  delete(id: number) {
    return this.service.delete(id).subscribe((res) => {
      if (res) {
        this.resetFilter();
      }
    });
  }

  getFiltered() {
    return this.service.getFiltered(this.filter, this.paging).pipe(
      map((res) => {
        if (res?.candidates) {
          this.candidates = Candidate.fromArray(res.candidates);
          this.totalCandidates = res.total;
        }
      })
    );
  }

  setPartyTypeForFilter(party: any) {
    this.filter.party = party as PartyTypeEnum;
    this.paging.page = 1; // reset to first page
    this.reloadPage();
  }

  private debounceSubscription() {
    this.filterChangedSubscription = this.filterChangedSubject
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => {
        this.paging.page = 1; // reset to first page
        this.reloadPage();
      });
  }
}
