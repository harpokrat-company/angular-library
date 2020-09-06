import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SecureActionService} from '../../../services/secure-action.service';

@Component({
  selector: 'hpk-request-password-form',
  templateUrl: './request-password-form.component.html',
  styleUrls: ['./request-password-form.component.css']
})
export class RequestPasswordFormComponent implements OnInit {

  error: string;

  resetForm: FormGroup;

  loading: boolean;

  @Output() readonly reset: EventEmitter<void>;

  constructor(
    private readonly $fb: FormBuilder,
    private readonly $secureActionService: SecureActionService,
  ) {
  }

  ngOnInit(): void {
    this.resetForm = this.$fb.group({
      email: ['', Validators.email],
    });
  }

  onSubmit() {
    this.loading = true;
    const email = this.resetForm.controls.email.value;
    this.$secureActionService.create({
      actionType: 'reset_password',
      payload: email
    }).subscribe(
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.error = 'An Error Occurred';
      }
    );
  }

}
