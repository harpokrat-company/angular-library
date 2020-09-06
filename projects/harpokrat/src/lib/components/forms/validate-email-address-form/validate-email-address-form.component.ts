import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SecureActionService} from '../../../services/secure-action.service';
import {ISecureActionResource} from '@harpokrat/client';

@Component({
  selector: 'hpk-validate-email-address-form',
  templateUrl: './validate-email-address-form.component.html',
  styleUrls: ['./validate-email-address-form.component.css']
})
export class ValidateEmailAddressFormComponent implements OnInit {

  @Input() secureAction: ISecureActionResource;

  @Input() token: string;

  @Output() validated = new EventEmitter<ISecureActionResource>();

  constructor(
    private readonly $secureActionService: SecureActionService,
  ) {
  }

  ngOnInit(): void {
    this.$secureActionService.update(this.secureAction.id, {
      ...this.secureAction,
      attributes: {
        validated: true,
      }
    }, {
      token: this.token,
    }).subscribe(
      (res) => this.validated.next(res),
    );
  }

}
