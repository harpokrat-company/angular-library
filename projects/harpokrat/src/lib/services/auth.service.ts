import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IResourceLinkage, ITokenResource} from '@harpokrat/client';

const LOCAL_STORAGE_TOKEN_KEY = 'token';
const LOCAL_STORAGE_KEY = 'key';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private $key: string;

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
    return this.$key;
  }

  set key(val: string) {
    this.$key = val;
    localStorage.setItem(LOCAL_STORAGE_KEY, val);
  }

  constructor() {
    this.$tokenSubject = new BehaviorSubject<ITokenResource>(null);
    this.$key = localStorage.getItem(LOCAL_STORAGE_KEY);
    const existing = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (existing) {
      this.$tokenSubject.next(JSON.parse(existing));
    }
  }
}
