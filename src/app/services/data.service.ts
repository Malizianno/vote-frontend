import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Election } from '../model/election.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private selectedElection = new BehaviorSubject<Election>(new Election());
  private electionsList = new BehaviorSubject<Election[]>([]);

  selectedElection$ = this.selectedElection.asObservable();
  electionsList$ = this.electionsList.asObservable();

  emitElection(newSelectedElection: Election) {
    this.selectedElection.next(newSelectedElection);
  }

  emitElectionList(newElectionList: Election[]) {
    this.electionsList.next(newElectionList);
  }
}
