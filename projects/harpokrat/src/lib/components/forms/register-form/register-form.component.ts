import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {map, switchMap} from 'rxjs/operators';
import {AuthService} from '../../../services/auth.service';
import {SecretService} from '../../../services/secret.service';
import {combineLatest, Observable} from 'rxjs';
import {IResource, IResourceIdentifier, IUser} from '@harpokrat/client';
import {RecaptchaService} from '../../../services/recaptcha.service';
import {ApiService} from "../../../services/api.service";
import {fromPromise} from "rxjs/internal-compatibility";

@Component({
  selector: 'hpk-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  error: string;

  registerForm: FormGroup;

  loading: boolean;

  @Output() readonly register = new EventEmitter<IUser>();

  @Input() user: IResource<IUser>;

  @Output() readonly userChange = new EventEmitter<IResource<IUser>>();

  readonly siteKeyObservable: Observable<string>;

  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $userService: UserService,
    private readonly $authService: AuthService,
    private readonly $apiService: ApiService,
    private readonly $secretsService: SecretService,
    private readonly $recaptchaService: RecaptchaService,
  ) {
    this.register = new EventEmitter<IUser>();
    this.siteKeyObservable = $recaptchaService.configObservable.pipe(
      map((conf) => conf['reCAPTCHA-v2-tickbox'].siteKey),
    );
  }

  private static checkPassword(group: FormGroup): null | object {
    const password = group.get('password').value;
    const passwordConfirmation = group.get('passwordConfirmation').value;
    return password === passwordConfirmation ? null : {notSame: true};
  }

  ngOnInit() {
    const {
      firstName = '',
      lastName = '',
      email = '',
    } = (this.user && this.user.attributes) || {};
    this.registerForm = this.$formBuilder.group({
      firstName: [firstName, Validators.required],
      lastName: [lastName, Validators.required],
      email: [email, [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
      captcha: ['', Validators.required],
    }, {validators: RegisterFormComponent.checkPassword});
  }

  private async renewSecrets(oldKey: string, newKey: string) {
    let page = 0;
    let secrets: IResource[];
    const oldSym = new this.$apiService.hcl.module.SymmetricKey();
    oldSym.SetKey(oldKey);
    const newSym = new this.$apiService.hcl.module.SymmetricKey();
    newSym.InitializeSymmetricCipher();
    newSym.SetKey(newKey);
    do {
      secrets = await this.$secretsService.readAll({
        page,
        filters: {
          'owner.id': (this.$authService.currentUser as IResourceIdentifier).id,
        },
      }).pipe(
        switchMap((se) => combineLatest(se.map((secret) => {
          const s = this.$apiService.hcl.module.Secret.Deserialize(oldSym.GetKey(), secret.attributes.content);
          return this.$secretsService.update(secret.id, {
            ...secret, attributes: {
              content: s.Serialize(newSym.GetKey()),
            },
          });
        }))),
      ).toPromise();
      page += 1;
    } while (secrets && secrets.length > 0);
  }

  onRegister() {
    this.loading = true;
    const {firstName, lastName, email, password, captcha} = this.registerForm.controls;
    const derivedKey = this.$apiService.hcl.module.GetDerivedKey(password.value);
    const attributes = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: derivedKey,
    };
    let obs: Observable<IResource<IUser>>;
    if (this.user != null) {
      const oldKey = this.$authService.key;
      const newKey = password.value;
      obs = this.$userService.update(this.user.id, {...this.user, attributes});
      if (oldKey != null && oldKey !== newKey) {
        obs = fromPromise(this.renewSecrets(oldKey, newKey).then(() => obs.toPromise()).then(() => this.$authService.key = newKey));
      }
    } else {
      obs = this.$userService.create(attributes, null, {
        'captcha': {
          'type': 'reCAPTCHA-v2-tickbox',
          'response': captcha.value,
        },
      });
    }
    obs.subscribe(
      (resource) => {
        this.loading = false;
        this.userChange.next(resource);
        this.register.emit(resource.attributes);
      },
      (err) => {
        console.error(err);
        this.error = 'An error occurred';
        this.loading = false;
      },
    );
  }
}
