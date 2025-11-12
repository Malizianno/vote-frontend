import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../util/app-constants.util';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private apiURL = AppConstants.BASE_URL + '/settings';

  constructor(private http: HttpClient) {}

  fakeCandidates(electionId: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.apiURL + `/fake/candidates/${electionId}`,
      {}
    );
  }

  fakeUsers(no: number): Observable<boolean> {
    return this.http.post<boolean>(this.apiURL + `/fake/users/${no}`, {});
  }

  fakeVotes(no: number, electionId: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.apiURL + `/fake/votes/${no}/${electionId}`,
      {}
    );
  }
}
