import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IResourceLinkage, ITokenResource} from '@harpokrat/client';
import {ISymmetricKey} from "@harpokrat/client/dist/lib/hcl/hcl-module";
import {ApiService} from "./api.service";

const LOCAL_STORAGE_TOKEN_KEY = 'token';
const LOCAL_STORAGE_KEY = 'key';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  symKey: ISymmetricKey;

  private readonly $tokenSubject: BehaviorSubject<ITokenResource>;

  get tokenObservable(): Observable<ITokenResource> {
    return this.$tokenSubject.asObservable();
  }

  get authenticatedObservable(): Observable<boolean> {
    return this.tokenObservable.pipe(
      map(value => value != null),
    );
  }

  get currentUser(): IResourceLinkage {
    return this.token.relationships.user.data;
  }

  get token(): ITokenResource {
    return this.$tokenSubject.value;
  }

  set token(value: ITokenResource) {
    this.$tokenSubject.next(value);
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(value));
  }

  get key(): string {
    return this.symKey && this.symKey.GetKey();
  }

  set key(val: string) {
    this.apiService.hcl.getModule().then((m) => new m.SymmetricKey()).then((k) => {
      console.log('Created symkey of type: ' + k.GetSecretTypeName());
      this.symKey = k;
      this.symKey.SetKey(val);
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, val);
  }

  constructor(
    private readonly apiService: ApiService,
  ) {
    apiService.hcl.init();
    apiService.hcl.getModule().then(() => {
      const key = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (key) {
        this.key = key;
      }
    });
    this.$tokenSubject = new BehaviorSubject<ITokenResource>(null);
    const existing = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (existing) {
      this.$tokenSubject.next(JSON.parse(existing));
    }
  }
}
