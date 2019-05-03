import {Link} from './link';

type LinksEntry = string | Link;

export class Links {

  self?: LinksEntry;

  related?: LinksEntry;

  [key: string]: LinksEntry;
}
