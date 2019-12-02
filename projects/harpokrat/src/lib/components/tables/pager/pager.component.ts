import {Component, Input, OnInit} from '@angular/core';
import {Datasource} from "../../../datasource/datasource";

@Component({
  selector: 'hpk-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  @Input() datasource: Datasource;

  constructor() {
  }

  ngOnInit() {
  }

  nextPage() {
    this.datasource.page += 1;
  }

  previousPage() {
    this.datasource.page -= 1;
  }

}
