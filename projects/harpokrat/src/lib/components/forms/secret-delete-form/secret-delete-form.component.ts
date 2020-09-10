import {Component, Input, OnInit} from '@angular/core';
import {SecretService} from '../../../services/secret.service';
import {IResource} from '@harpokrat/client';
import {Password} from "@harpokrat/hcl";

@Component({
  selector: 'hpk-secret-delete-form',
  templateUrl: './secret-delete-form.component.html',
  styleUrls: ['./secret-delete-form.component.css']
})
export class SecretDeleteFormComponent implements OnInit {

  @Input() secret: IResource<Password>;

  constructor(
    readonly secretService: SecretService,
  ) {
  }

  ngOnInit(): void {
  }

}
