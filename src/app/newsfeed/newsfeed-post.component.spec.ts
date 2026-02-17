import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsfeedPostsComponent } from './newsfeed-post.component';

describe('NewsfeedPostsComponent', () => {
  let component: NewsfeedPostsComponent;
  let fixture: ComponentFixture<NewsfeedPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsfeedPostsComponent],
    });
    fixture = TestBed.createComponent(NewsfeedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
