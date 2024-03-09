import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CandidateResponse } from "../model/candidate-response.dto";
import { Candidate } from "../model/candidate.model";
import { Paging } from "../model/paging.model";
import { AppConstants } from "../util/app-constants.util";
import { User } from "../model/user.model";
import { UserResponse } from "../model/user-response.dto";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private apiURL = AppConstants.BASE_URL + '/users';

    constructor(private http: HttpClient) { }

    getOne(id: number): Observable<User> {
        return this.http.get<User>(this.apiURL + `/${id}`, {});
    }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.apiURL + '/all', {});
    }

    getFiltered(user: User, paging: Paging): Observable<UserResponse> {
        const filter = { user, paging: { page: paging.page - 1, size: paging.size } };

        return this.http.post<UserResponse>(this.apiURL + '/filtered', filter, {});
    }

    add(user: User): Observable<User> {
        return this.http.post<User>(this.apiURL + '/save', user, {});
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(this.apiURL + `/delete/${id}`, {});
    }
}