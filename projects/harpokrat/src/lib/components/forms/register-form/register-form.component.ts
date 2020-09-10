import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {HclwService} from '@harpokrat/hcl';
import {flatMap, map, switchMap, take} from 'rxjs/operators';
import {AuthService} from '../../../services/auth.service';
import {SecretService} from '../../../services/secret.service';
import {combineLatest, defer, Observable} from 'rxjs';
import {IResource, IResourceIdentifier, ISecret, IUser} from '@harpokrat/client';
import {RecaptchaService} from '../../../services/recaptcha.service';

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
    private readonly $hclwService: HclwService,
    private readonly $secretsService: SecretService,
    private readonly $recaptchaService: RecaptchaService,
  ) {
    this.register = new EventEmitter<IUser>();
    this.siteKeyObservable = $recaptchaService.configObservable.pipe(
      map((conf) => conf.siteKey),
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
    let secrets: IResource<ISecret>[];
    const oldSym = await this.$hclwService.createSymmetricKey();
    oldSym.key = oldKey;
    const newSym = await this.$hclwService.createSymmetricKey();
    newSym.key = newKey;
    newSym.initializeSymmetric();
    do {
      secrets = await this.$secretsService.readAll({
        page,
        filters: {
          'owner.id': (this.$authService.currentUser as IResourceIdentifier).id,
        },
      }).pipe(
        flatMap((se) => combineLatest(se.map((secret) => {
          return defer(() => this.$hclwService.deserializeSecret(oldSym.secret, secret.attributes.content)).pipe(
            switchMap((s) => this.$secretsService.update(secret.id, {
              ...secret, attributes: {
                content: newSym.serialize(newSym.secret),
              },
            })),
          );
        }))),
        take(1),
      ).toPromise();
      page += 1;
    } while (secrets && secrets.length > 0);
  }

  onRegister() {
    this.loading = true;
    const {firstName, lastName, email, password, captcha} = this.registerForm.controls;
    defer(() => this.$hclwService.getDerivedKey(password.value)).pipe(
      switchMap((derived) => {
        const attributes = {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          password: derived,
        };
        if (this.user != null) {
          const oldKey = this.$authService.key;
          const newKey = password.value;
          const obs = this.$userService.update(this.user.id, {...this.user, attributes});
          if (oldKey != null && oldKey !== newKey) {
            return this.renewSecrets(oldKey, newKey).then(() => obs.toPromise()).then(() => this.$authService.key = newKey);
          }
          return obs;
        } else {
          return this.$userService.create(attributes, null, {
            'captcha': captcha.value,
          });
        }
      }),
    ).subscribe(
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
