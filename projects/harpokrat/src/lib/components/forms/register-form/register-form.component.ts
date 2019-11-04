import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/domain/user";

@Component({
  selector: 'hpk-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  error: string;

  registerForm: FormGroup;

  loading: boolean;

  @Output() readonly register: EventEmitter<User>;

  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $userService: UserService,
  ) {
    this.register = new EventEmitter<User>();
  }

  private static checkPassword(group: FormGroup): null | object {
    const password = group.get('password').value;
    const passwordConfirmation = group.get('passwordConfirmation').value;
    return password === passwordConfirmation ? null : {notSame: true};
  }

  ngOnInit() {
    this.registerForm = this.$formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
    }, {validators: RegisterFormComponent.checkPassword})
  }

  onRegister() {
    if (!this.loading) {
      this.loading = true;
      const {firstName, lastName, email, password} = this.registerForm.controls;
      this.$userService.create({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      }).subscribe(
        (resource) => {
          this.loading = false;
          this.register.emit(resource.attributes)
        },
        () => {
          this.error = 'An error occurred';
          this.loading = false;
        },
      )
    }
  }

}
