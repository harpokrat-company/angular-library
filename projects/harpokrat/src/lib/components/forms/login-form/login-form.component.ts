import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenService} from "../../../services/token.service";
import {Token} from "../../../models/domain/token";

@Component({
  selector: 'hpk-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  error: string;

  loginForm: FormGroup;

  loading: boolean;

  @Output() readonly login: EventEmitter<Token>;

  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $tokenService: TokenService,
  ) {
    this.login = new EventEmitter<Token>();
  }

  ngOnInit() {
    this.loginForm = this.$formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.loading = false;
    this.error = null;
  }

  onLogin() {
    if (!this.loading) {
      this.loading = true;
      const {email, password} = this.loginForm.controls;
      this.$tokenService.login(email.value, password.value).subscribe(
        (resource) => {
          this.loading = false;
          this.login.emit(resource.attributes);
        },
        () => {
          this.error = 'Invalid email/password';
          this.loading = false;
        },
      );
    }
  }

}
