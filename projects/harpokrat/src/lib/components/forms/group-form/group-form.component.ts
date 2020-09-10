import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IGroup, IGroupResource, IOrganizationResource} from "@harpokrat/client";
import {AuthService} from "../../../services/auth.service";
import {GroupService} from "../../../services/group.service";
import {Observable} from "rxjs";

@Component({
  selector: 'hpk-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {

  error: string;

  groupForm: FormGroup;

  loading: boolean;

  @Input() group: IGroupResource;

  @Input() parent: IGroupResource;

  @Input() organisation: IOrganizationResource;

  @Output() readonly create = new EventEmitter<IGroupResource>();

  @Output() readonly groupChange = this.create;

  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $authService: AuthService,
    private readonly $groupService: GroupService,
  ) {
  }

  ngOnInit() {
    const attributes: Partial<IGroup> = this.group && this.group.attributes || {};
    this.groupForm = this.$formBuilder.group({
      name: [attributes.name || '', Validators.required],
    });
  }

  onCreate() {
    this.loading = true;
    const {name} = this.groupForm.controls;
    let obs: Observable<any>;
    const attributes: IGroup = {
      name: name.value,
    };
    if (this.group) {
      obs = this.$groupService.update(this.group.id, {
        ...this.group,
        attributes,
      });
    } else {
      obs = this.$groupService.create(attributes, {
        organization: this.organisation && {data: this.organisation},
        parent: this.parent && {data: this.parent},
        members: {data: this.$authService.currentUser},
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
