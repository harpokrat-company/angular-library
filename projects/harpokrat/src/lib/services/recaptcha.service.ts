import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IRecaptcha} from '@harpokrat/client';
import {ApiService} from './api.service';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  readonly configObservable: Observable<IRecaptcha>;

  constructor(
    private readonly $api: ApiService,
  ) {
    this.configObservable = new Observable<IRecaptcha>((subscriber) => {
      this.$api.client.recaptcha.read().then((val) => {
        subscriber.next(val.attributes);
      });
    }).pipe(shareReplay());
  }
}
