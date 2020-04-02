import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SecretService} from "../../../services/secret.service";
import {AuthService} from "../../../services/auth.service";
import {Relationship} from "../../../models/relationship";
import {HclwService, Secret} from "@harpokrat/hcl";

@Component({
  selector: 'hpk-secret-form',
  templateUrl: './secret-form.component.html',
  styleUrls: ['./secret-form.component.css']
})
export class SecretFormComponent implements OnInit {

  error: string;

  secretForm: FormGroup;

  loading: boolean;

  @Output() readonly create = new EventEmitter<Secret>();

  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $secretService: SecretService,
    private readonly $authService: AuthService,
    private readonly $hclwService: HclwService,
  ) {
  }

  ngOnInit() {
    this.secretForm = this.$formBuilder.group({
      name: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      domain: ['', Validators.required],
    });
  }

  onCreate() {
    this.loading = true;
    const {name, password, login, domain} = this.secretForm.controls;
    const s = new Secret(this.$hclwService);
    s.name = name;
    s.login = login;
    s.password = password;
    s.domain = domain;
    this.$secretService.create({
      content: s.content,
    }, {'owner': Relationship.of(this.$authService.currentUser)}).subscribe(
      (resource) => {
        this.loading = false;
        this.create.emit(new Secret(this.$hclwService, resource.attributes.content))
      },
      () => {
        this.error = 'An error occurred';
        this.loading = false;
      },
    )
  }

}
