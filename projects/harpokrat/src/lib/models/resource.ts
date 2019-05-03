import {Links} from './links';
import {Relationships} from './relationships';
import {ResourceIdentifier} from './resource-identifier';

export class Resource<T = any> extends ResourceIdentifier {

  attributes?: T;

  relationships?: Relationships;

  links?: Links;
}
