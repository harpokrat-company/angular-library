import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'hpk-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() error: string;

  @Input() loading: boolean;

  @Input() formGroup: FormGroup;

  @Input() submitTitle: string = 'Submit';

  @Output() readonly formSubmit: EventEmitter<void>;

  constructor() {
    this.formSubmit = new EventEmitter<void>();
  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.loading && this.formGroup.valid) {
      console.log('lol');
      this.formSubmit.emit();
    }
  }

}
