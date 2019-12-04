import {Datasource} from "./datasource";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {ResourceService} from "../services/resource.service";
import {debounceTime, flatMap, map, shareReplay} from "rxjs/operators";
import {Resource} from "../models/resource";

export class ResourceDatasource<T = any> implements Datasource {

  private readonly $dataObservable: Observable<Resource<T>[]>;
  private readonly $pageSubject: BehaviorSubject<number>;
  private readonly $sizeSubject: BehaviorSubject<number>;
  private readonly $sortSubject: BehaviorSubject<string>;
  private readonly $sortDescendingSubject: BehaviorSubject<boolean>;

  private $loading: boolean;

  get loading(): boolean {
    return this.$loading;
  }

  get data(): Observable<any[]> {
    return this.$dataObservable.pipe(
      map(d => d.map(r => r.attributes)),
    );
  }

  get page(): number {
    return this.$pageSubject.value;
  }

  set page(value: number) {
    this.$pageSubject.next(value);
  }

  get size(): number {
    return this.$sizeSubject.value;
  }

  set size(value: number) {
    this.$sizeSubject.next(value);
  }

  get sort(): string {
    return this.$sortSubject.value;
  }

  set sort(value: string) {
    this.$sortSubject.next(value);
  }

  get sortDescending(): boolean {
    return this.$sortDescendingSubject.value;
  }

  set sortDescending(value: boolean) {
    this.$sortDescendingSubject.next(value);
  }

  constructor(
    private readonly service: ResourceService<T>,
  ) {
    this.$pageSubject = new BehaviorSubject<number>(0);
    this.$sizeSubject = new BehaviorSubject<number>(20);
    this.$sortSubject = new BehaviorSubject<string>(undefined);
    this.$sortDescendingSubject = new BehaviorSubject<boolean>(false);
    const changedObservable = combineLatest([
      this.$pageSubject,
      this.$sizeSubject,
      this.$sortSubject,
      this.$sortDescendingSubject
    ]);
    changedObservable.subscribe(() => this.$loading = true);
    this.$dataObservable = changedObservable.pipe(
      debounceTime(100),
      flatMap(([page, size, sort, sortDescending]) => {
        return this.service.readAll({
          page,
          size,
          sort,
          sortDescending,
        })
      }),
      shareReplay(1),
    );
    this.$dataObservable.subscribe(() => this.$loading = false);
    this.$loading = false;
  }

  dispose() {
    this.$pageSubject.complete();
    this.$sizeSubject.complete();
    this.$sortSubject.complete();
    this.$sortDescendingSubject.complete();
  }

}
