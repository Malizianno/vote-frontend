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
import { Election } from '../model/election.model';
import { Paging } from '../model/paging.model';
import { ElectionService } from '../services/elections.service';
import { DateUtil } from '../util/date.util';
import { AddElectionComponent } from './add/add-election.modal';
import { EditElectionComponent } from './edit/edit-election.modal';

@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.scss'],
})
export class ElectionsComponent {
  elections: Election[] = [];

  filter = new Election();
  paging = new Paging();
  totalElections = 0;

  filterChangedSubject: Subject<string> = new Subject<string>();
  filterChangedSubscription!: Subscription;

  constructor(
    private service: ElectionService,
    private modalService: NgbModal
  ) {
    this.reloadPage();
    this.debounceSubscription();
  }

  reloadPage() {
    this.getFiltered().subscribe();
  }

  resetFilter() {
    this.filter = new Election();
    this.paging.page = 1;
    this.reloadPage();
  }

  onPageChange($event: number) {
    this.paging.page = $event;
    this.reloadPage();
  }

  add() {
    // open modal to add new candidate
    const modalref = this.modalService.open(AddElectionComponent);

    modalref.result.then(
      (res: Election) => {
        if (null != res.id) {
          this.resetFilter();
        }
      },
      (err: any) => {
        // Handle the error case if needed
      }
    );
  }

  edit(id: number) {
    // open modal to add new candidate
    const modalref = this.modalService.open(EditElectionComponent);
    modalref.componentInstance.id = id; // pass the ID to the modal

    modalref.result.then(
      (res: Election) => {
        if (null != res.id) {
          this.resetFilter();
        }
      },
      (err: any) => {
        // Handle the error case if needed
      }
    );
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
        if (res?.elections) {
          console.log('Elections fetched:', res);
          this.elections = Candidate.fromArray(res.elections);
          this.totalElections = res.total;
        }
      })
    );
  }

  isDateValid(date: any): boolean {
    return DateUtil.isDateValid(date);
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
