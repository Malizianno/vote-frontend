import { GenericModel } from './generic.model';

export class NewsfeedPost extends GenericModel {
  id!: number;
  title!: string;
  content!: string;
  imageUrl!: string;
  createdAt!: Date;
  updatedAt!: Date;
  createdBy!: string;
  electionId!: number;
}

export class NewsfeedPostResponse extends GenericModel {
  posts!: NewsfeedPost[];
  total!: number;
}