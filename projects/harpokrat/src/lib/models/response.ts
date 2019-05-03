import {Links} from './links';
import {Meta} from './meta';
import {Resource} from './resource';
import {Jsonapi} from './jsonapi';

type PrimaryData<T> = Resource<T> | Resource<T>[];

export class Response<T = any> {

  data: PrimaryData<T>;

  errors: Error[];

  meta: Meta;

  jsonapi?: Jsonapi;

  links?: Links;

  included?: Resource[];
}
