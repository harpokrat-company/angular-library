import {Component, Input, OnInit} from '@angular/core';
import {IResource} from '@harpokrat/client';
import {IPassword} from "@harpokrat/client/dist/lib/hcl/hcl-module";

enum SecretStatus {
  VIEW = 0,
  EDIT = 1,
  DELETE = 2,
}

@Component({
  selector: 'hpk-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.css']
})
export class SecretComponent implements OnInit {

  @Input() secret: IResource<IPassword>;

  status: SecretStatus;

  constructor() {
  }

  ngOnInit(): void {
    this.status = SecretStatus.VIEW;
  }

  view() {
    this.status = SecretStatus.VIEW;
  }

  edit() {
    this.status = SecretStatus.EDIT;
  }

  delete() {
    this.status = SecretStatus.DELETE;
  }
}
