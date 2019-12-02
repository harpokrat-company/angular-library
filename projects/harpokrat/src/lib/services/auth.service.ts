import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Token} from "../models/domain/token";
import {Resource} from "../models/resource";
import {ResourceLinkage} from "../models/relationship";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  private readonly $tokenSubject: BehaviorSubject<Resource<Token>>;

  get token(): Resource<Token> {
    return this.$tokenSubject.value;
  }

  set token(value: Resource<Token>) {
    this.$tokenSubject.next(value);
  }

  constructor() {
    this.$tokenSubject = new BehaviorSubject<Resource<Token>>(null);
  }
}
