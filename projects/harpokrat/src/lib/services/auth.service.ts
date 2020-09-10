import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IResourceLinkage, ITokenResource} from '@harpokrat/client';
import {HclwService, SymmetricKey} from "@harpokrat/hcl";

const LOCAL_STORAGE_TOKEN_KEY = 'token';
const LOCAL_STORAGE_KEY = 'key';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  symKey: SymmetricKey;

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
    return this.symKey && this.symKey.key;
  }

  set key(val: string) {
    this.hclwService.createSymmetricKey().then((k) => {
      console.log('Created symkey of type: ' + k.typeName);
      console.log('Encryption type: ' + k.encryptionKeyType);
      this.symKey = k;
      this.symKey.key = val;
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, val);
  }

  constructor(
    @Inject('hcl') private readonly hclwService: HclwService,
  ) {
    window['hclw'] = hclwService;
    this.hclwService.instantiateWasm('https://static.harpokrat.com/hcl/hcl2.wasm').then(() => {
      this.key = localStorage.getItem(LOCAL_STORAGE_KEY);
    });
    this.$tokenSubject = new BehaviorSubject<ITokenResource>(null);
    const existing = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (existing) {
      this.$tokenSubject.next(JSON.parse(existing));
    }
  }
}
