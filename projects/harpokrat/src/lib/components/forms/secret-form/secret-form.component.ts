import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SecretService} from '../../../services/secret.service';
import {AuthService} from '../../../services/auth.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {IResource} from '@harpokrat/client';
import {ApiService} from "../../../services/api.service";
import {IPassword} from "@harpokrat/client/dist/lib/hcl/hcl-module";

@Component({
  selector: 'hpk-secret-form',
  templateUrl: './secret-form.component.html',
  styleUrls: ['./secret-form.component.css']
})
export class SecretFormComponent implements OnInit {

  error: string;

  secretForm: FormGroup;

  loading: boolean;

  @Input() secret: IResource<IPassword>;

  @Output() readonly create = new EventEmitter<IPassword>();

  @Output() readonly secretChange = this.create;

  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $secretService: SecretService,
    private readonly $authService: AuthService,
    private readonly $apiService: ApiService,
  ) {
  }

  ngOnInit() {
    const attributes: Partial<IPassword> = this.secret && this.secret.attributes;
    this.secretForm = this.$formBuilder.group({
      name: [attributes && attributes.GetName() || '', Validators.required],
      login: [attributes && attributes.GetLogin() || '', Validators.required],
      password: [attributes && attributes.GetPassword() || '', Validators.required],
      domain: [attributes && attributes.GetDomain() || '', Validators.required],
    });
  }

  async onCreate() {
    this.loading = true;
    const {name, password, login, domain} = this.secretForm.controls;
    console.log('CREATE PASSWORD OK');
    const hcl = await this.$apiService.hcl.getModule();
    console.log('HCL=', hcl);
    const s = new hcl.Password();
    s.InitializeSymmetricCipher();
    s.SetName(name.value);
    s.SetLogin(login.value);
    s.SetPassword(password.value);
    s.SetDomain(domain.value);
    const serialized = s.Serialize(this.$authService.key);
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
        content: serialized,
        private: true,
      }, {owner: {data: this.$authService.currentUser}});
    }
    obs.pipe(
      map((resource) => hcl.Secret.Deserialize(this.$authService.symKey.GetKey(), resource.attributes.content)),
    ).subscribe(
      (resource) => {
        this.loading = false;
        this.create.emit(resource as IPassword);
      },
      (e) => {
        this.error = 'An error occurred';
        this.loading = false;
      },
    );
  }

}
