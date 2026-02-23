import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesComponent } from './candidates.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoSelectedElectionMessageComponent } from '../components/no-selected-election-message/no-selected-election-message.component';
import { TranslateModule } from '@ngx-translate/core';

describe('CandidatesComponent', () => {
  let component: CandidatesComponent;
  let fixture: ComponentFixture<CandidatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      declarations: [CandidatesComponent, NoSelectedElectionMessageComponent],
    });
    fixture = TestBed.createComponent(CandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
