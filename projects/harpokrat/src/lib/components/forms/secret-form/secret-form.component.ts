import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SecretService} from "../../../services/secret.service";
import {AuthService} from "../../../services/auth.service";
import {Relationship} from "../../../models/relationship";
import {HclwService, Secret} from "@harpokrat/hcl";
import {flatMap} from "rxjs/operators";

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
    this.$hclwService.createSecret().subscribe((s) => {
      s.name = name;
      s.login = login;
      s.password = password;
      s.domain = domain;
      this.$secretService.create({
        content: s.getContent(this.$authService.key),
      }, {'owner': Relationship.of(this.$authService.currentUser)}).pipe(
        flatMap((resource) => this.$hclwService.createSecret(this.$authService.key, resource.attributes.content)),
      ).subscribe(
        (resource) => {
          this.loading = false;
          this.create.emit(resource);
        },
        () => {
          this.error = 'An error occurred';
          this.loading = false;
        },
      )
    });
  }

}
