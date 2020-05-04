import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Token} from "../models/domain/token";
import {Resource} from "../models/resource";
import {ResourceLinkage} from "../models/relationship";

const LOCAL_STORAGE_TOKEN_KEY = 'token';

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
    return this.token.relationships['user'].data;
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
  }

  constructor() {
    this.$tokenSubject = new BehaviorSubject<Resource<Token>>(null);
    const existing = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (existing) {
      this.$tokenSubject.next(JSON.parse(existing));
    }
  }
}
