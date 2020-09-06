import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenService} from '../../../services/token.service';
import {AuthService} from '../../../services/auth.service';
import {IToken} from '@harpokrat/client';

@Component({
  selector: 'hpk-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  error: string;

  loginForm: FormGroup;

  loading: boolean;

  @Output() readonly login: EventEmitter<IToken>;

  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $tokenService: TokenService,
    private readonly $authService: AuthService
  ) {
    this.login = new EventEmitter<IToken>();
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
    this.loading = true;
    this.error = null;
    const {email, password} = this.loginForm.controls;
    this.$tokenService.login(email.value, password.value).subscribe(
      (resource) => {
        this.loading = false;
        this.login.emit(resource.attributes);
        this.$authService.key = password.value;
      }, (err) => {
        console.error(err);
        this.error = 'Invalid email/password';
        this.loading = false;
      },
    );
  }

}
