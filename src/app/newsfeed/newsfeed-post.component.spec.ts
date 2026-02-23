import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NewsfeedPostsComponent } from './newsfeed-post.component';
import { NoSelectedElectionMessageComponent } from '../components/no-selected-election-message/no-selected-election-message.component';

describe('NewsfeedPostsComponent', () => {
  let component: NewsfeedPostsComponent;
  let fixture: ComponentFixture<NewsfeedPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [
        NewsfeedPostsComponent,
        NoSelectedElectionMessageComponent,
      ],
    });
    fixture = TestBed.createComponent(NewsfeedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
