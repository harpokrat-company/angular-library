import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/domain/user";
import {HclwService} from "@harpokrat/hcl";
import {flatMap, switchMap, take} from "rxjs/operators";
import {Resource} from "../../../models/resource";
import {AuthService} from "../../../services/auth.service";
import {SecretService} from "../../../services/secret.service";
import {Secret} from "../../../models/domain/secret";
import {ResourceIdentifier} from "../../../models/resource-identifier";
import {combineLatest} from "rxjs";

@Component({
  selector: 'hpk-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  error: string;

  registerForm: FormGroup;

  loading: boolean;

  @Output() readonly register = new EventEmitter<User>();

  @Input() user: Resource<User>;

  @Output() readonly userChange = new EventEmitter<Resource<User>>();

  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $userService: UserService,
    private readonly $authService: AuthService,
    private readonly $hclwService: HclwService,
    private readonly $secretsService: SecretService,
  ) {
    this.register = new EventEmitter<User>();
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
    }, {validators: RegisterFormComponent.checkPassword});
  }

  private async renewSecrets(oldKey: string, newKey: string) {
    let page = 0;
    let secrets: Resource<Secret>[];
    do {
      secrets = await this.$secretsService.readAll({
        page,
        filters: {
          'owner.id': (this.$authService.currentUser as ResourceIdentifier).id,
        },
      }).pipe(
        flatMap((secrets) => combineLatest(secrets.map((secret) => {
          console.log('secret', secret);
          return this.$hclwService.createSecret(oldKey, secret.attributes.content).pipe(
            switchMap((s) => this.$secretsService.update(secret.id, {
              ...secret, attributes: {
                content: s.getContent(newKey),
              },
            })),
          );
        }))),
        take(1),
      ).toPromise();
      page += 1;
    } while (secrets && secrets.length > 0)
  }

  onRegister() {
    this.loading = true;
    const {firstName, lastName, email, password} = this.registerForm.controls;
    this.$hclwService.getDerivedKey(password.value).pipe(
      flatMap((derived) => {
        const attributes = {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          password: derived,
        };
        if (this.user != null) {
          const oldKey = this.$authService.key;
          const newKey = password.value;
          const obs = this.$userService.update(this.user.id, {...this.user, attributes: attributes});
          if (oldKey != null && oldKey !== newKey) {
            return this.renewSecrets(oldKey, newKey).then(() => obs.toPromise()).then(() => this.$authService.key = newKey);
          }
          return obs;
        } else {
          return this.$userService.create(attributes);
        }
      }),
    ).subscribe(
      (resource) => {
        this.loading = false;
        this.userChange.next(resource);
        this.register.emit(resource.attributes)
      },
      (err) => {
        console.error(err);
        this.error = 'An error occurred';
        this.loading = false;
      },
    )
  }
}
