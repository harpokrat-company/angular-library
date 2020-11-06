import {Inject, Injectable} from "@angular/core";
import * as hcl from './hcl/hcl';
import {BehaviorSubject, Observable} from "rxjs";
import {filter} from "rxjs/operators";

const WASM_URL = 'https://static.harpokrat.com/hcl/hcl2.wasm';

@Injectable({
  providedIn: 'root'
})
export class HclService {

  get module(): any {
    return this.moduleSubject.value;
  }

  private readonly moduleSubject: BehaviorSubject<any>;
  readonly moduleObservable: Observable<any>;

  constructor(
    @Inject('wasmUrl')
    private wasmUrl: string,
  ) {
    this.moduleSubject = new BehaviorSubject<any>(null);
    this.moduleObservable = this.moduleSubject.pipe(
      filter((v) => v != null),
    );
    const module = hcl({
      noInitialRun: true,
      locateFile: url => {
        if (url.endsWith(".wasm")) {
          return WASM_URL;
        }
        return url;
      },
      onRuntimeInitialized: () => {
        this.moduleSubject.next(module);
      }
    });
  }
}
