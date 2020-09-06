import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '@harpokrat/client';

@Component({
  selector: 'hpk-profile-viewer',
  templateUrl: './profile-viewer.component.html',
  styleUrls: ['./profile-viewer.component.css']
})
export class ProfileViewerComponent implements OnInit {

  @Input() user: IUser;

  constructor() {
  }

  ngOnInit(): void {
  }

}
