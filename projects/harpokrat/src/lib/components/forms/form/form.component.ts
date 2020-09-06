import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'hpk-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() buttonClass = 'btn-primary';

  @Input() error: string;

  @Output() errorChange = new EventEmitter<string>();

  @Input() loading: boolean;

  @Input() formGroup: FormGroup;

  @Input() submitTitle: string = 'Submit';

  @Output() readonly formSubmit = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.loading && this.formGroup.valid) {
      this.formSubmit.emit();
    }
  }

  dismissError() {
    this.error = null;
    this.errorChange.emit(this.error);
  }

}
