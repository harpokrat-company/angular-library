import {Links} from './links';
import {Meta} from './meta';
import {Resource} from './resource';
import {Jsonapi} from './jsonapi';

export type PrimaryData<T> = Resource<T> | Resource<T>[];

export class Response<T = any, DataT extends PrimaryData<T> = PrimaryData<T>> {

  data?: DataT;

  errors?: Error[];

  meta?: Meta;

  jsonapi?: Jsonapi;

  links?: Links;

  included?: Resource[];

  constructor(data?: DataT, errors?: Error[], meta?: Meta, jsonapi?: Jsonapi, links?: Links, included?: Resource[]) {
    this.data = data;
    this.errors = errors;
    this.meta = meta;
    this.jsonapi = jsonapi;
    this.links = links;
    this.included = included;
  }
}
