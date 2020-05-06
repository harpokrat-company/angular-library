import {Component, Input, OnInit} from '@angular/core';
import {Resource} from "../../../models/resource";
import {SecretService} from "../../../services/secret.service";
import {Secret} from "@harpokrat/hcl";

@Component({
  selector: 'hpk-secret-delete-form',
  templateUrl: './secret-delete-form.component.html',
  styleUrls: ['./secret-delete-form.component.css']
})
export class SecretDeleteFormComponent implements OnInit {

  @Input() secret: Resource<Secret>;

  constructor(
    readonly secretService: SecretService,
  ) {
  }

  ngOnInit(): void {
  }

}
