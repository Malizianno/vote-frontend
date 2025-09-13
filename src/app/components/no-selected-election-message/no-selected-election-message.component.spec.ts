import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSelectedElectionMessageComponent } from './no-selected-election-message.component';

describe('NoSelectedElectionMessageComponent', () => {
  let component: NoSelectedElectionMessageComponent;
  let fixture: ComponentFixture<NoSelectedElectionMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoSelectedElectionMessageComponent],
    });
    fixture = TestBed.createComponent(NoSelectedElectionMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
