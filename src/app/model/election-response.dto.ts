import { Election } from './election.model';
import { GenericModel } from './generic.model';
import { Paging } from './paging.model';

export class ElectionResponse extends GenericModel {
  elections!: Election[];
  total!: number;
}

export class ElectionRequest extends GenericModel {
  election!: Election;
  paging!: Paging;

  constructor(election: Election, paging: Paging) {
    super();
    this.election = election;
    this.paging = paging;
  }
}