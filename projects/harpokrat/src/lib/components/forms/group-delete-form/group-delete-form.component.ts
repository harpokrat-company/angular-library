import {Component, Input, OnInit} from '@angular/core';
import {IGroupResource} from "@harpokrat/client";
import {GroupService} from "../../../services/group.service";

@Component({
  selector: 'hpk-group-delete-form',
  templateUrl: './group-delete-form.component.html',
  styleUrls: ['./group-delete-form.component.css']
})
export class GroupDeleteFormComponent implements OnInit {

  @Input() group: IGroupResource;

  constructor(
    readonly groupService: GroupService,
  ) {
  }

  ngOnInit(): void {
  }

}
