import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../../../harpokrat/src/lib/services/auth.service';
import {SecretService} from '../../../harpokrat/src/lib/services/secret.service';
import {
  IGroupResource,
  IOrganizationResource,
  IResource,
  ISecureActionResource,
  IUserResource,
  IVaultResource
} from '@harpokrat/client';
import {UserService} from "../../../harpokrat/src/lib/services/user.service";
import {map} from "rxjs/operators";
import {IPassword} from "@harpokrat/client/dist/lib/hcl/hcl-module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly usersObservable: Observable<IUserResource[]>;

  readonly sampleSecret: Observable<IResource<IPassword>>;
  readonly sampleSecureAction: ISecureActionResource;

  readonly sampleOrg: IOrganizationResource;
  readonly sampleGroup: IGroupResource;
  readonly sampleVault: IVaultResource;

  readonly authenticatedObservable: Observable<boolean>;

  constructor(
    private readonly authService: AuthService,
    private readonly $secretService: SecretService,
    private readonly $userService: UserService,
  ) {
    this.authenticatedObservable = authService.authenticatedObservable;
    this.sampleSecureAction = {
      type: 'secure_action',
      id: '',
      attributes: {
        actionType: 'reset_password',
      },
    };
    /* this.sampleSecret = defer(() => $hclwService.createPassword()).pipe(
      map((s) => {
        s.name = 'A';
        s.login = 'B';
        s.password = 'C';
        s.domain = 'D';
        return {
          type: '',
          id: 'aled',
          attributes: s,
        };
      }),
    );*/
    this.sampleOrg = {
      type: 'organization',
      attributes: {
        name: 'Test ORG',
      },
    };
    this.sampleGroup = {
      type: 'group',
      attributes: {
        name: 'Test GROUP',
      },
    };
    this.sampleVault = {
      type: 'vault',
      attributes: {
        name: 'Test VAULT',
      },
    };
    this.usersObservable = this.$userService.readAll();
  }

}
