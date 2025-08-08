import { Election } from './election.model';
import { GenericModel } from './generic.model';

export class ElectionResponse extends GenericModel {
  elections!: Election[];
  total!: number;
}
