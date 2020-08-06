import {Component, OnDestroy, OnInit} from '@angular/core';
import {ResourceTableConfiguration} from "../resource-table/resource-table.component";
import {Datasource} from "../../../datasource/datasource";
import {SecretService} from "../../../services/secret.service";
import {HclwService, Secret} from "@harpokrat/hcl";
import {AuthService} from "../../../services/auth.service";
import {switchMap, tap} from "rxjs/operators";
import {combineLatest} from "rxjs";
import {ResourceIdentifier} from "../../../models/resource-identifier";

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

  readonly datasource: Datasource<Secret>;

  constructor(
    private readonly $secretService: SecretService,
    private readonly $authService: AuthService,
    private readonly $hclwService: HclwService,
  ) {
    this.datasource = $secretService.asDatasource({
      'owner.id': (this.$authService.currentUser as ResourceIdentifier).id,
    }).pipe((obs) => obs.pipe(
      switchMap((secrets) => combineLatest(
        secrets.map((s) => $hclwService.createSecret($authService.key, s.attributes.content)),
      )),
    ));
  }

  ngOnDestroy(): void {
    this.datasource.dispose();
  }

}
