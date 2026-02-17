import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsfeedPost } from 'src/app/model/newsfeed-post.model';
import { NewsfeedService } from 'src/app/services/newsfeed.service';

@Component({
  selector: 'app-add-newsfeed-post-modal',
  templateUrl: './add-newsfeed-post.modal.html',
  styleUrls: ['./add-newsfeed-post.modal.scss'],
})
export class AddNewsfeedPostComponent {
  newsfeedPostFilter = new NewsfeedPost();

  constructor(
    private service: NewsfeedService,
    public activeModal: NgbActiveModal
  ) {}

  save() {
    this.service
      .addNewsfeedPost(this.newsfeedPostFilter)
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
      !!this.newsfeedPostFilter &&
      this.newsfeedPostFilter.title &&
      this.newsfeedPostFilter.content &&
      this.newsfeedPostFilter.imageUrl
    );
  }
}
