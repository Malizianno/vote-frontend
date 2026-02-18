import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs';
import { Election } from '../model/election.model';
import { NewsfeedPost } from '../model/newsfeed-post.model';
import { Paging } from '../model/paging.model';
import { DataService } from '../services/data.service';
import { NewsfeedService } from '../services/newsfeed.service';
import { AddNewsfeedPostComponent } from './add/add-newsfeed-post.modal';
import { EditNewsfeedPostComponent } from './edit/edit-newsfeed-post.modal';

@Component({
  selector: 'app-newsfeed-posts',
  templateUrl: './newsfeed-post.component.html',
  styleUrls: ['./newsfeed-post.component.scss'],
})
export class NewsfeedPostsComponent implements OnInit {
  posts: NewsfeedPost[] = [];

  selectedElection: Election = new Election();

  filter = new NewsfeedPost();
  paging = new Paging();
  totalPosts = 0;

  filterChangedSubject: Subject<string> = new Subject<string>();
  filterChangedSubscription!: Subscription;

  constructor(
    private service: NewsfeedService,
    private modalService: NgbModal,
    private dataService: DataService
  ) {
    this.debounceSubscription();
    this.reloadPage();
  }

  ngOnInit(): void {
    this.dataService.selectedElection$.subscribe((election) => {
      if (election.id > 0) {
        this.selectedElection = election;
        this.filter.electionId = election.id;
        this.reloadPage();
      }
    });
  }

  reloadPage() {
    this.getFiltered();
  }

  resetFilter() {
    this.filter = new NewsfeedPost();
    this.filter.electionId = this.selectedElection.id;
    this.paging.page = 1;
    this.reloadPage();
  }

  onPageChange($event: number) {
    this.paging.page = $event;
    this.reloadPage();
  }

  add() {
    // open modal to add new newsfeed post
    const modalref = this.modalService.open(AddNewsfeedPostComponent);
    modalref.componentInstance.newsfeedPostFilter.electionId = this.selectedElection.id; // pass the election ID to the modal

    modalref.result.then(
      (res: NewsfeedPost) => {
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
    // open modal to edit newsfeed post
    const modalref = this.modalService.open(EditNewsfeedPostComponent);
    modalref.componentInstance.newsfeedPost.id = id; // pass the ID to the modal

    modalref.result.then(
      (res: NewsfeedPost) => {
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
    console.log('Deleting newsfeed post with ID:', id);

    this.service.deleteNewsfeedPost(id).subscribe((res) => {
      console.log('Deleted response:', res);
      if (res) {
        this.resetFilter();
      }
    });
  }

  getFiltered() {
    this.service.getNewsfeedFiltered(this.filter, this.paging).subscribe((res) => {
        if (res?.posts) {
          this.posts = res.posts;
          this.totalPosts = res.total;
        }
      });
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
