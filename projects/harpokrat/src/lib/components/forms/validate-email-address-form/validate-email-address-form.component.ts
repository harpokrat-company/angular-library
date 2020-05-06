import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SecureAction} from "../../../models/domain/secure-action";
import {SecureActionService} from "../../../services/secure-action.service";
import {Resource} from "../../../models/resource";

@Component({
  selector: 'hpk-validate-email-address-form',
  templateUrl: './validate-email-address-form.component.html',
  styleUrls: ['./validate-email-address-form.component.css']
})
export class ValidateEmailAddressFormComponent implements OnInit {

  @Input() secureAction: Resource<SecureAction>;

  @Input() token: string;

  @Output() validated = new EventEmitter<Resource<SecureAction>>();

  constructor(
    private readonly $secureActionService: SecureActionService,
  ) {
  }

  ngOnInit(): void {
    this.$secureActionService.update(this.secureAction.id, {
      ...this.secureAction,
      attributes: {
        validated: true,
      },
      meta: {
        token: this.token,
      }
    },).subscribe(
      (res) => this.validated.next(res),
    );
  }

}
