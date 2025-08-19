import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Candidate } from 'src/app/model/candidate.model';
import { CandidateService } from 'src/app/services/candidates.service';
import { PartyTypeEnum } from 'src/app/util/party-type.enum';

@Component({
  selector: 'app-edit-candidate-modal',
  templateUrl: './edit-candidate.modal.html',
  styleUrls: ['./edit-candidate.modal.scss'],
})
export class EditCandidateComponent implements OnInit {
  parties = Object.keys(PartyTypeEnum)
    .filter((v) => v != 'ALL')
    .filter((v) => isNaN(Number(v)));

  id = 0; // used to get the candidate by ID (default)
  candidate = new Candidate();

  constructor(
    private service: CandidateService,
    public activeModal: NgbActiveModal
  ) {
    // empty constructor
  }
  ngOnInit(): void {
    this.getCandidateByID(this.id);
  }

  getCandidateByID(id: number) {
    this.service.getOne(id).subscribe((res: Candidate) => {
      if (res) {
        this.candidate = res;
      } else {
        this.activeModal.close('responseBody null');
      }
    });
  }

  save() {
    this.service.add(this.candidate).subscribe((res: Candidate) => {
      if (res) {
        this.activeModal.close(res);
      } else {
        this.activeModal.close('responseBody null');
      }
    });
  }

  canSave() {
    return (
      !!this.candidate &&
      this.candidate.firstName &&
      this.candidate.lastName &&
      this.candidate.party &&
      this.candidate.image &&
      this.candidate.description
    );
  }

  setPartyTypeForFilter(party: any) {
    this.candidate.party = party as PartyTypeEnum;
  }
}
