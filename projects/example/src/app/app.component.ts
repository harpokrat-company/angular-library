import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from "../../../harpokrat/src/lib/services/auth.service";
import {Secret} from "../../../harpokrat/src/lib/models/domain/secret";
import {SecretService} from "../../../harpokrat/src/lib/services/secret.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly authenticatedObservable: Observable<boolean>;

  constructor(
    private readonly authService: AuthService,
    private readonly $secretService: SecretService,
  ) {
    this.authenticatedObservable = authService.authenticatedObservable;
  }

  createSecret(secret: Secret) {
    this.$secretService.create(secret).subscribe();
  }

}
