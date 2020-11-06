import {Component, OnDestroy} from '@angular/core';
import {ResourceTableConfiguration} from '../resource-table/resource-table.component';
import {Datasource} from '../../../datasource/datasource';
import {SecretService} from '../../../services/secret.service';
import {AuthService} from '../../../services/auth.service';
import {map} from 'rxjs/operators';
import {IResourceIdentifier} from '@harpokrat/client';
import {ApiService} from "../../../services/api.service";
import {IPassword} from "@harpokrat/client/dist/lib/hcl/hcl-module";

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

  readonly datasource: Datasource<IPassword>;

  constructor(
    private readonly $secretService: SecretService,
    private readonly $authService: AuthService,
    private readonly $apiService: ApiService,
  ) {
    this.datasource = $secretService.asDatasource({
      'owner.id': (this.$authService.currentUser as IResourceIdentifier).id,
    }).pipe((obs) => obs.pipe(
      map((secrets) => secrets.map((s) => this.$apiService.hcl.module.Secret.Deserialize($authService.symKey.GetKey(), s.attributes.content))),
      map((s) => s.filter((s) => s.CorrectDecryption()).map((s) => this.$apiService.hcl.cast<IPassword>(s))),
    ));
  }

  ngOnDestroy(): void {
    this.datasource.dispose();
  }

}
