import {Component, Input, OnInit} from '@angular/core';
import {IOrganizationResource} from "@harpokrat/client";
import {OrganizationService} from "../../../services/organization.service";

@Component({
  selector: 'hpk-organisation-delete-form',
  templateUrl: './organisation-delete-form.component.html',
  styleUrls: ['./organisation-delete-form.component.css']
})
export class OrganisationDeleteFormComponent implements OnInit {

  @Input() organisation: IOrganizationResource;

  constructor(
    readonly organizationService: OrganizationService,
  ) {
  }

  ngOnInit(): void {
  }
}
