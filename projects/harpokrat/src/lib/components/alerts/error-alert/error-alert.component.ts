import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'hpk-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.css']
})
export class ErrorAlertComponent implements OnInit {

  @Input() text: string;

  @Input() allowDismiss: boolean;

  @Output() dismissed: EventEmitter<void>;

  constructor() {
    this.dismissed = new EventEmitter<void>();
    this.allowDismiss = false;
  }

  ngOnInit() {
  }

  dismiss() {
    this.dismissed.emit();
  }
}
