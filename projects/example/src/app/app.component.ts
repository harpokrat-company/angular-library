import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from "../../../harpokrat/src/lib/services/auth.service";
import {SecretService} from "../../../harpokrat/src/lib/services/secret.service";
import {HclwService, Secret} from "@harpokrat/hcl";
import {map, tap} from "rxjs/operators";
import {Resource} from "../../../harpokrat/src/lib/models/resource";
import {SecureAction} from "../../../harpokrat/src/lib/models/domain/secure-action";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly sampleSecret: Observable<Resource<Secret>>;
  readonly sampleSecureAction: Resource<SecureAction>;

  readonly authenticatedObservable: Observable<boolean>;

  constructor(
    private readonly authService: AuthService,
    private readonly $secretService: SecretService,
    private readonly $hclwService: HclwService,
  ) {
    this.authenticatedObservable = authService.authenticatedObservable;
    this.sampleSecureAction = {
      type: 'secure_action',
      id: '',
      attributes: {
        actionType: 'validate_email_address',
      },
    };
    this.sampleSecret = $hclwService.createSecret().pipe(
      map((s) => {
        s.name = 'A';
        s.login = 'B';
        s.password = 'C';
        s.domain = 'D';
        return new Resource(
          '',
          'aled',
          null,
          s
        );
      }),
    );
  }

}
