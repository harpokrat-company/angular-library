import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SecretService} from '../../../services/secret.service';
import {AuthService} from '../../../services/auth.service';
import {Relationship} from '../../../models/relationship';
import {HclwService, Secret} from '@harpokrat/hcl';
import {flatMap} from 'rxjs/operators';
import {Resource} from '../../../models/resource';
import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';

@Component({
  selector: 'hpk-secret-form',
  templateUrl: './secret-form.component.html',
  styleUrls: ['./secret-form.component.css']
})
export class SecretFormComponent implements OnInit {

  error: string;

  secretForm: FormGroup;

  loading: boolean;

  @Input() secret: Resource<Secret>;

  @Output() readonly create = new EventEmitter<Secret>();

  @Output() readonly secretChange = this.create;

  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $secretService: SecretService,
    private readonly $authService: AuthService,
    private readonly $hclwService: HclwService,
  ) {
  }

  ngOnInit() {
    const attributes: Partial<Secret> = this.secret && this.secret.attributes || {};
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
    fromPromise(this.$hclwService.createSecret()).subscribe((s) => {
      s.name = name.value;
      s.login = login.value;
      s.password = password.value;
      s.domain = domain.value;
      let obs: Observable<any>;
      if (this.secret) {
        obs = this.$secretService.update(this.secret.id, {
          ...this.secret,
          attributes: {
            content: s.getContent(this.$authService.key),
          },
        });
      } else {
        obs = this.$secretService.create({
          content: s.getContent(this.$authService.key),
        }, {owner: Relationship.of(this.$authService.currentUser)});
      }
      obs.pipe(
        flatMap((resource) => this.$hclwService.createSecret(this.$authService.key, resource.attributes.content)),
      ).subscribe(
        (resource) => {
          console.log(resource);
          this.loading = false;
          this.create.emit(resource);
        },
        () => {
          this.error = 'An error occurred';
          this.loading = false;
        },
      );
    });
  }

}
