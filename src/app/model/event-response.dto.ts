import { Event } from './event.model';
import { GenericModel } from './generic.model';

export class EventResponse extends GenericModel {
  events!: Event[];
  total!: number;
}
