import {Component, Inject, OnDestroy} from '@angular/core';
import {ResourceTableConfiguration} from '../resource-table/resource-table.component';
import {Datasource} from '../../../datasource/datasource';
import {SecretService} from '../../../services/secret.service';
import {HclwService, Password} from '@harpokrat/hcl';
import {AuthService} from '../../../services/auth.service';
import {map, switchMap} from 'rxjs/operators';
import {combineLatest, defer} from 'rxjs';
import {IResourceIdentifier} from '@harpokrat/client';

@Component({
  selector: 'hpk-secrets-table',
  templateUrl: './secrets-table.component.html',
  styleUrls: ['./secrets-table.component.css']
})
export class SecretsTableComponent implements OnDestroy {

  readonly config: ResourceTableConfiguration = {
    columns: [
      {
        name: 'Name',
        key: 'name',
      },
      {
        name: 'Login',
        key: 'login',
      },
      {
        name: 'Domain',
        key: 'domain',
      },
    ]
  };

  readonly datasource: Datasource<Password>;

  constructor(
    private readonly $secretService: SecretService,
    private readonly $authService: AuthService,
    private readonly $hclwService: HclwService,
  ) {
    this.datasource = $secretService.asDatasource({
      'owner.id': (this.$authService.currentUser as IResourceIdentifier).id,
    }).pipe((obs) => obs.pipe(
      switchMap((secrets) => combineLatest(
        secrets.map((s) => defer(() => $hclwService.deserializeSecret($authService.symKey.secret, s.attributes.content)).pipe(
          map((s) => s as Password),
        )),
      )),
    ));
  }

  ngOnDestroy(): void {
    this.datasource.dispose();
  }

}
