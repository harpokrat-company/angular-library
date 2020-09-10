import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../../../harpokrat/src/lib/services/auth.service';
import {SecretService} from '../../../harpokrat/src/lib/services/secret.service';
import {HclwService, Password} from '@harpokrat/hcl';
import {
  IGroupResource,
  IOrganizationResource,
  IResource,
  ISecureActionResource,
  IVaultResource
} from '@harpokrat/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly sampleSecret: Observable<IResource<Password>>;
  readonly sampleSecureAction: ISecureActionResource;

  readonly sampleOrg: IOrganizationResource;
  readonly sampleGroup: IGroupResource;
  readonly sampleVault: IVaultResource;

  readonly authenticatedObservable: Observable<boolean>;

  constructor(
    private readonly authService: AuthService,
    private readonly $secretService: SecretService,
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
  }

}
