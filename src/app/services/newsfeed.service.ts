import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  NewsfeedPost,
  NewsfeedPostResponse,
} from '../model/newsfeed-post.model';
import { Paging } from '../model/paging.model';
import { AppConstants } from '../util/app-constants.util';

@Injectable({
  providedIn: 'root',
})
export class NewsfeedService {
  private apiURL = AppConstants.BASE_URL + '/newsfeed';

  constructor(private http: HttpClient) {}

  getOne(id: number): Observable<NewsfeedPost> {
    return this.http.get<NewsfeedPost>(this.apiURL + `/${id}`, {});
  }

  getNewsfeedAll(): Observable<NewsfeedPost[]> {
    return this.http.get<NewsfeedPost[]>(this.apiURL + '/all', {});
  }

  getNewsfeedFiltered(
    post: NewsfeedPost,
    paging: Paging
  ): Observable<NewsfeedPostResponse> {
    const filter = {
      post,
      paging: { page: paging.page - 1, size: paging.size },
    };

    return this.http.post<NewsfeedPostResponse>(
      this.apiURL + '/filtered',
      filter,
      {}
    );
  }

  addNewsfeedPost(post: NewsfeedPost): Observable<NewsfeedPost> {
    return this.http.post<NewsfeedPost>(this.apiURL + '/add', post, {});
  }

  updateNewsfeedPost(post: NewsfeedPost): Observable<NewsfeedPost> {
    return this.http.put<NewsfeedPost>(
      this.apiURL + `/update/${post.id}`,
      post,
      {}
    );
  }

  deleteNewsfeedPost(id: number): Observable<any> {
    return this.http.delete(this.apiURL + `/delete/${id}`, {});
  }
}
