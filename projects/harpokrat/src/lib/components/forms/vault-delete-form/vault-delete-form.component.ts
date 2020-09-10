import {Component, Input, OnInit} from '@angular/core';
import {IVaultResource} from "@harpokrat/client";
import {VaultService} from "../../../services/vault.service";

@Component({
  selector: 'hpk-vault-delete-form',
  templateUrl: './vault-delete-form.component.html',
  styleUrls: ['./vault-delete-form.component.css']
})
export class VaultDeleteFormComponent implements OnInit {

  @Input() vault: IVaultResource;

  constructor(
    readonly vaultService: VaultService,
  ) {
  }

  ngOnInit(): void {
  }
}
