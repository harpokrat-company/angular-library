import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Token} from '../models/domain/token';
import {Resource} from '../models/resource';
import {ResourceLinkage} from '../models/relationship';

const LOCAL_STORAGE_TOKEN_KEY = 'token';
const LOCAL_STORAGE_KEY = 'key';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private $key: string;

  private readonly $tokenSubject: BehaviorSubject<Resource<Token>>;

  get tokenObservable(): Observable<Resource<Token>> {
    return this.$tokenSubject.asObservable();
  }

  get authenticatedObservable(): Observable<boolean> {
    return this.tokenObservable.pipe(
      map(value => value != null),
    );
  }

  get currentUser(): ResourceLinkage {
    return this.token.relationships.user.data;
  }

  get token(): Resource<Token> {
    return this.$tokenSubject.value;
  }

  set token(value: Resource<Token>) {
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
    this.$tokenSubject = new BehaviorSubject<Resource<Token>>(null);
    this.$key = localStorage.getItem(LOCAL_STORAGE_KEY);
    const existing = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (existing) {
      this.$tokenSubject.next(JSON.parse(existing));
    }
  }
}
