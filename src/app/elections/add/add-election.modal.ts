import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Election } from 'src/app/model/election.model';
import { ElectionService } from 'src/app/services/elections.service';

@Component({
  selector: 'app-add-election-modal',
  templateUrl: './add-election.modal.html',
  styleUrls: ['./add-election.modal.scss'],
})
export class AddElectionComponent {
  election = new Election();

  constructor(
    private service: ElectionService,
    public activeModal: NgbActiveModal
  ) {
    this.election.enabled = false; // default value
    this.election.startDate = new Date();
  }

  save() {
    this.service.add(this.election).subscribe((res: Election) => {
      if (res) {
        this.activeModal.close(res);
      } else {
        this.activeModal.close('responseBody null');
      }
    });
  }

  canSave() {
    return (
      !!this.election &&
      this.election.name &&
      (this.election.enabled != null) &&
      this.election.description &&
      this.election.startDate
    );
  }
}
