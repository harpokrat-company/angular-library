import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private $token: string;

  get token(): string {
    return this.$token;
  }

  set token(value: string) {
    this.$token = value;
  }

  constructor() {
  }
}
