import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {IUser, IUserResource} from "@harpokrat/client";

@Component({
  selector: 'hpk-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() users: IUserResource[];

  @Input() allowRemove: boolean = false;

  @Output() remove = new EventEmitter<IUserResource>()

  constructor() {
  }

  ngOnInit(): void {
  }

}
