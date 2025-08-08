import { Injectable } from '@angular/core';
import { AppConstants } from '../util/app-constants.util';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate, CandidateWithStatistics } from '../model/candidate.model';
import { Election } from '../model/election.model';
import { Paging } from '../model/paging.model';
import { ElectionResponse } from '../model/election-response.dto';

@Injectable({
  providedIn: 'root',
})
export class ElectionService {
  private apiURL = AppConstants.BASE_URL + '/election';

  constructor(private http: HttpClient) {}

  getOne(id: number): Observable<Election> {
    return this.http.get<Election>(this.apiURL + `/${id}`, {});
  }

  getAll(): Observable<Election[]> {
    return this.http.get<Election[]>(this.apiURL + '/all', {});
  }

  getFiltered(
    election: Election,
    paging: Paging
  ): Observable<ElectionResponse> {
    const filter = {
      election,
      paging: { page: paging.page - 1, size: paging.size },
    };

    return this.http.post<ElectionResponse>(
      this.apiURL + '/filtered',
      filter,
      {}
    );
  }

  add(election: Election): Observable<Election> {
    return this.http.post<Election>(this.apiURL + '/add', election, {});
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiURL + `/delete/${id}`, {});
  }

  // WIP: helper area starts here

  voteResult(): Observable<Candidate> {
    return this.http.get<Candidate>(this.apiURL + '/result', {});
  }

  status(): Observable<boolean> {
    return this.http.get<boolean>(this.apiURL + '/status', {});
  }

  switchStatus(): Observable<boolean> {
    return this.http.get<boolean>(this.apiURL + '/switchStatus', {});
  }

  cleanDB(): Observable<boolean> {
    return this.http.get<boolean>(this.apiURL + '/cleanDB', {});
  }

  countAllVotes(): Observable<number> {
    return this.http.get<number>(this.apiURL + '/countAllVotes', {});
  }

  getParsedVotes(): Observable<CandidateWithStatistics[]> {
    return this.http.get<CandidateWithStatistics[]>(
      this.apiURL + '/getParsedVotes',
      {}
    );
  }
}
