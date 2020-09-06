import {Datasource} from './datasource';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Filters, ResourceService} from '../services/resource.service';
import {debounceTime, map, shareReplay, switchMap} from 'rxjs/operators';
import {DerivedDatasource} from './derived-datasource';
import {IResource} from '@harpokrat/client';

export class ResourceDatasource<T = any> implements Datasource {

  private readonly $dataObservable: Observable<IResource<T>[]>;
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
    private readonly filters: Filters,
  ) {
    this.$pageSubject = new BehaviorSubject<number>(0);
    this.$sizeSubject = new BehaviorSubject<number>(10);
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
      switchMap(([page, size, sort, sortDescending]) => {
        return this.service.readAll({
          page,
          size,
          sort,
          sortDescending,
          filters,
        });
      }),
      shareReplay({refCount: true, bufferSize: 1}),
    );
    this.$dataObservable.subscribe(() => this.$loading = false);
    this.$loading = false;
  }

  pipe<S>(mapper: (obs: Observable<IResource<T>[]>) => Observable<S[]>): Datasource<S> {
    return new DerivedDatasource(this, mapper(this.$dataObservable));
  }

  dispose() {
    this.$pageSubject.complete();
    this.$sizeSubject.complete();
    this.$sortSubject.complete();
    this.$sortDescendingSubject.complete();
  }

}
