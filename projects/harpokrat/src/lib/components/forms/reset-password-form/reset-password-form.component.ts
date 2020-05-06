import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SecureActionService} from "../../../services/secure-action.service";
import {SecureAction} from "../../../models/domain/secure-action";
import {Resource} from "../../../models/resource";
import {HclwService} from "@harpokrat/hcl";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'hpk-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {

  error: string;

  resetForm: FormGroup;

  loading: boolean;

  @Output() readonly reset = new EventEmitter<void>();

  @Input() token: string;

  @Input() secureAction: Resource<SecureAction>;

  constructor(
    private readonly $fb: FormBuilder,
    private readonly $secureActionService: SecureActionService,
    private readonly $hclwService: HclwService,
  ) {
  }

  ngOnInit(): void {
    this.resetForm = this.$fb.group({
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    const password = this.resetForm.controls.password.value;
    this.$hclwService.getDerivedKey(password.value).pipe(
      switchMap(() => this.$secureActionService.update(this.secureAction.id, {
        ...this.secureAction,
        attributes: {
          payload: password
        }
      }, {
        token: this.token,
      })),
    ).subscribe(
      () => {
        this.loading = false;
        this.reset.next();
      },
      () => {
        this.loading = false;
        this.error = 'An Error Occurred'
      }
    );
  }

}
