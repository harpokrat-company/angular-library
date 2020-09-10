import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SecretService} from '../../../services/secret.service';
import {AuthService} from '../../../services/auth.service';
import {HclwService, Password} from '@harpokrat/hcl';
import {flatMap} from 'rxjs/operators';
import {defer, Observable} from 'rxjs';
import {IResource} from '@harpokrat/client';

@Component({
  selector: 'hpk-secret-form',
  templateUrl: './secret-form.component.html',
  styleUrls: ['./secret-form.component.css']
})
export class SecretFormComponent implements OnInit {

  error: string;

  secretForm: FormGroup;

  loading: boolean;

  @Input() secret: IResource<Password>;

  @Output() readonly create = new EventEmitter<Password>();

  @Output() readonly secretChange = this.create;

  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $secretService: SecretService,
    private readonly $authService: AuthService,
    private readonly $hclwService: HclwService,
  ) {
  }

  ngOnInit() {
    const attributes: Partial<Password> = this.secret && this.secret.attributes || {};
    this.secretForm = this.$formBuilder.group({
      name: [attributes.name || '', Validators.required],
      login: [attributes.login || '', Validators.required],
      password: [attributes.password || '', Validators.required],
      domain: [attributes.domain || '', Validators.required],
    });
  }

  onCreate() {
    this.loading = true;
    const {name, password, login, domain} = this.secretForm.controls;
    defer(() => this.$hclwService.createPassword()).subscribe((s) => {
      console.log('CREATE PASSWORD OK');
      s.name = name.value;
      s.login = login.value;
      s.password = password.value;
      s.domain = domain.value;
      s.initializeSymmetric();
      console.log(this.$authService.symKey.encryptionKeyType);
      console.log('SET ALL OK');
      console.log(this.$authService.symKey.secret);
      const serialized = s.serialize(this.$authService.symKey.secret);
      console.log(serialized);
      let obs: Observable<any>;
      if (this.secret) {
        obs = this.$secretService.update(this.secret.id, {
          ...this.secret,
          attributes: {
            content: serialized,
          },
        });
      } else {
        obs = this.$secretService.create({
          content: s.serialize(this.$authService.symKey.secret),
          private: true,
        }, {owner: {data: this.$authService.currentUser}});
      }
      obs.pipe(
        flatMap((resource) => this.$hclwService.deserializeSecret(this.$authService.symKey.secret, resource.attributes.content)),
      ).subscribe(
        (resource) => {
          console.log(resource);
          this.loading = false;
          this.create.emit(resource as Password);
        },
        () => {
          this.error = 'An error occurred';
          this.loading = false;
        },
      );
    });
  }

}
