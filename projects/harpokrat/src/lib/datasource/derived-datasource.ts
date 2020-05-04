import {Datasource} from "./datasource";
import {Observable} from "rxjs";

export class DerivedDatasource<T = any> implements Datasource<T> {

  get loading(): boolean {
    return this.$parent.loading;
  }

  get page(): number {
    return this.$parent.page;
  }

  set page(value: number) {
    this.$parent.page = value;
  }

  get size(): number {
    return this.$parent.size;
  }

  set size(value: number) {
    this.$parent.size = value;
  }

  get sort(): string {
    return this.$parent.sort;
  }

  set sort(value: string) {
    this.$parent.sort = value;
  }

  get sortDescending(): boolean {
    return this.$parent.sortDescending;
  }

  set sortDescending(value: boolean) {
    this.$parent.sortDescending = value;
  }

  constructor(
    private readonly $parent: Datasource<any>,
    readonly data: Observable<T[]>,
  ) {
  }
}
