import {Component, OnInit} from '@angular/core';
import {ResourceTableConfiguration} from "../resource-table/resource-table.component";
import {Datasource} from "../../../datasource/datasource";
import {SecretService} from "../../../services/secret.service";
import {HclwService, Secret} from "@harpokrat/hcl";
import {AuthService} from "../../../services/auth.service";
import {combineLatest, switchMap} from "rxjs/operators";

@Component({
  selector: 'hpk-secrets-table',
  templateUrl: './secrets-table.component.html',
  styleUrls: ['./secrets-table.component.css']
})
export class SecretsTableComponent implements OnInit {

  readonly config: ResourceTableConfiguration = {
    columns: [
      {
        name: 'Name',
        key: 'name',
      }
    ]
  };

  readonly datasource: Datasource<Secret>;

  constructor(
    private readonly $secretService: SecretService,
    private readonly $authService: AuthService,
    private readonly $hclwService: HclwService,
  ) {
    this.datasource = $secretService.asDatasource().pipe((obs) => obs.pipe(
      switchMap((secrets) => combineLatest(
        ...secrets.map((s) => $hclwService.createSecret($authService.key, s.attributes.content)),
      )),
    ));
  }

  ngOnInit() {
  }

}
