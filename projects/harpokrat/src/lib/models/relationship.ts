import {Links} from './links';
import {Meta} from './meta';
import {ResourceIdentifier} from './resource-identifier';

type ResourceLinkage = null | ResourceIdentifier | ResourceIdentifier[];

export class Relationship {

  links?: Links;

  data?: ResourceLinkage;

  meta?: Meta;
}
