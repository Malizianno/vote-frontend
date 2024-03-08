import { GenericModel } from "./generic.model";

export class Candidate extends GenericModel {
    id!: number;
    firstName!: string;
    lastName!: string;
    party!: string; // XXX: this should be an enum
    image!: string;
    description!: string;

}