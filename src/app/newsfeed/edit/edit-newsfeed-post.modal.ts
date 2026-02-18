import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsfeedPost } from 'src/app/model/newsfeed-post.model';
import { NewsfeedService } from 'src/app/services/newsfeed.service';

@Component({
  selector: 'app-edit-newsfeed-post-modal',
  templateUrl: './edit-newsfeed-post.modal.html',
  styleUrls: ['./edit-newsfeed-post.modal.scss'],
})
export class EditNewsfeedPostComponent implements OnInit {
  newsfeedPost = new NewsfeedPost();

  constructor(
    private service: NewsfeedService,
    public activeModal: NgbActiveModal
  ) {
    // empty constructor
  }
  ngOnInit(): void {
    this.getNewsfeedPostByID(this.newsfeedPost.id);
  }

  getNewsfeedPostByID(id: number) {
    this.service.getOne(id).subscribe((res: NewsfeedPost) => {
      if (res) {
        this.newsfeedPost = res;
      } else {
        this.activeModal.close('responseBody null');
      }
    });
  }

  save() {
    this.service
      .updateNewsfeedPost(this.newsfeedPost)
      .subscribe((res: NewsfeedPost) => {
        if (res) {
          this.activeModal.close(res);
        } else {
          this.activeModal.close('responseBody null');
        }
      });
  }

  canSave() {
    return (
      !!this.newsfeedPost &&
      this.newsfeedPost.title &&
      this.newsfeedPost.content &&
      this.newsfeedPost.imageUrl &&
      this.newsfeedPost.electionId
    );
  }
}
