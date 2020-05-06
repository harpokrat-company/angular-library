import {Component, Input, OnInit} from '@angular/core';
import {SecureAction} from "../../models/domain/secure-action";
import {Resource} from "../../models/resource";
import {Router} from "@angular/router";

@Component({
  selector: 'hpk-secure-action',
  templateUrl: './secure-action.component.html',
  styleUrls: ['./secure-action.component.css']
})
export class SecureActionComponent implements OnInit {

  @Input() token: string;

  @Input() secureAction: Resource<SecureAction>;

  constructor(
    private readonly $router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  redirect(): void {
    this.$router.navigate(['/']).then();
  }

}
