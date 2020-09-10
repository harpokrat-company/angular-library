import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IOrganization, IOrganizationResource} from "@harpokrat/client";
import {OrganizationService} from "../../../services/organization.service";
import {AuthService} from "../../../services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'hpk-organisation-form',
  templateUrl: './organisation-form.component.html',
  styleUrls: ['./organisation-form.component.css']
})
export class OrganisationFormComponent implements OnInit {

  error: string;

  organisationForm: FormGroup;

  loading: boolean;

  @Input() organisation: IOrganizationResource;

  @Output() readonly create = new EventEmitter<IOrganizationResource>();

  @Output() readonly organisationChange = this.create;

  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $authService: AuthService,
    private readonly $organisationService: OrganizationService,
  ) {
  }

  ngOnInit() {
    const attributes: Partial<IOrganization> = this.organisation && this.organisation.attributes || {};
    this.organisationForm = this.$formBuilder.group({
      name: [attributes.name || '', Validators.required],
    });
  }

  onCreate() {
    this.loading = true;
    const {name} = this.organisationForm.controls;
    let obs: Observable<any>;
    const attributes: IOrganization = {
      name: name.value,
    };
    if (this.organisation) {
      obs = this.$organisationService.update(this.organisation.id, {
        ...this.organisation,
        attributes,
      });
    } else {
      obs = this.$organisationService.create(attributes, {
        owner: {data: this.$authService.currentUser}
      });
    }
    obs.subscribe((resource) => {
      this.loading = false;
      this.create.emit(resource);
    }, () => {
      this.error = 'An error occurred';
      this.loading = false;
    });
  }

}
