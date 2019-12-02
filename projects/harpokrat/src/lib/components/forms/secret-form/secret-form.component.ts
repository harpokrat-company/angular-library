import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Secret} from "../../../models/domain/secret";
import {SecretService} from "../../../services/secret.service";
import {AuthService} from "../../../services/auth.service";
import {Relationship} from "../../../models/relationship";

@Component({
  selector: 'hpk-secret-form',
  templateUrl: './secret-form.component.html',
  styleUrls: ['./secret-form.component.css']
})
export class SecretFormComponent implements OnInit {

  error: string;

  secretForm: FormGroup;

  loading: boolean;

  @Output() readonly create: EventEmitter<Secret>;


  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $secretService: SecretService,
    private readonly $authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.secretForm = this.$formBuilder.group({
      content: ['', Validators.required],
    });
  }

  onCreate() {
    this.loading = true;
    const {content} = this.secretForm.controls;
    this.$secretService.create({
      content: content.value,
    }, {'owner': Relationship.of(this.$authService.currentUser)}).subscribe(
      (resource) => {
        this.loading = false;
        this.create.emit(resource.attributes)
      },
      () => {
        this.error = 'An error occurred';
        this.loading = false;
      },
    )
  }

}
