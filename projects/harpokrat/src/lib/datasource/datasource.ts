import {Observable} from "rxjs";

export interface Datasource<T = any> {

  readonly data: Observable<T[]>;

  readonly loading: boolean;

  size: number;

  page: number;

  sort: string;

  sortDescending: boolean;
}
