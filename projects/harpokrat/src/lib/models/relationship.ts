import {Links} from './links';
import {Meta} from './meta';
import {ResourceIdentifier} from './resource-identifier';

export type ResourceLinkage = null | ResourceIdentifier | ResourceIdentifier[];

export class Relationship {

  links?: Links;

  data?: ResourceLinkage;

  meta?: Meta;

  constructor(data?: ResourceLinkage) {
    this.data = data;
  }

  static of(data: ResourceLinkage) {
    return new Relationship(data);
  }
}
