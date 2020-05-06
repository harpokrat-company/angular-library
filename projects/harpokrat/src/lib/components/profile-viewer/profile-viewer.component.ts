import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/domain/user";

@Component({
  selector: 'hpk-profile-viewer',
  templateUrl: './profile-viewer.component.html',
  styleUrls: ['./profile-viewer.component.css']
})
export class ProfileViewerComponent implements OnInit {

  @Input() user: User;

  constructor() {
  }

  ngOnInit(): void {
  }

}
