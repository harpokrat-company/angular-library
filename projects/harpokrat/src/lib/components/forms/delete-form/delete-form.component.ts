import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Resource} from "../../../models/resource";
import {ResourceService} from "../../../services/resource.service";

@Component({
  selector: 'hpk-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.css']
})
export class DeleteFormComponent implements OnInit {

  error: string;

  secretForm: FormGroup;

  loading: boolean;

  @Input() resource: Resource;

  @Input() service: ResourceService;

  constructor(
    private readonly $fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.secretForm = this.$fb.group([]);
  }

  onDelete() {
    this.loading = true;
    this.service.delete(this.resource.id).subscribe(
      () => this.loading = false,
      (err) => {
        console.error(err);
        this.loading = false;
        this.error = 'An error occurred'
      },
    );
  }
}
