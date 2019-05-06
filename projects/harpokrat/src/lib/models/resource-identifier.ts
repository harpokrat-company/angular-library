import {Meta} from './meta';

export class ResourceIdentifier {

  type: string;

  id: string;

  meta?: Meta;

  constructor(type: string, id: string, meta?: Meta) {
    this.type = type;
    this.id = id;
    this.meta = meta;
  }
}

