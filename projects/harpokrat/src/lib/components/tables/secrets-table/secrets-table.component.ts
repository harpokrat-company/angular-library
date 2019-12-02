import {Component, OnInit} from '@angular/core';
import {ResourceTableConfiguration} from "../resource-table/resource-table.component";
import {Datasource} from "../../../datasource/datasource";
import {Secret} from "../../../models/domain/secret";
import {SecretService} from "../../../services/secret.service";

@Component({
  selector: 'hpk-secrets-table',
  templateUrl: './secrets-table.component.html',
  styleUrls: ['./secrets-table.component.css']
})
export class SecretsTableComponent implements OnInit {

  readonly config: ResourceTableConfiguration = {
    columns: [
      {
        name: 'Content',
        key: 'content',
      }
    ]
  };

  readonly datasource: Datasource<Secret>;

  constructor(
    private readonly $secretService: SecretService,
  ) {
    this.datasource = $secretService.asDatasource();
  }

  ngOnInit() {
  }

}
