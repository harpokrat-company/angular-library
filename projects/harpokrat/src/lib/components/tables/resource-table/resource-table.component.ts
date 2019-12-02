import {Component, Input, OnInit} from '@angular/core';
import {Datasource} from "../../../datasource/datasource";
import {combineLatest, Observable, ReplaySubject, Subject} from "rxjs";
import {exhaustMap, flatMap, map, switchMap} from "rxjs/operators";
import {Data} from "@angular/router";

export interface ResourceTableColumnConfiguration {

  name: string;

  key?: string;

  allowSort?: boolean;

  selectValue?: (value: any) => any;
}

export interface ResourceTableConfiguration {

  showIndex?: boolean;

  columns: ResourceTableColumnConfiguration[];
}

interface ResourceTableRenderSettings {

  showIndex: boolean;

  datasource: Datasource;

  rows: any[][];

  columns: string[];
}

@Component({
  selector: 'hpk-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.css']
})
export class ResourceTableComponent implements OnInit {

  @Input() set configuration(value: ResourceTableConfiguration) {
    this.$configurationSubject.next(value);
  }

  @Input() set datasource(value: Datasource) {
    this.$datasourceSubject.next(value);
  }

  private readonly $configurationSubject: Subject<ResourceTableConfiguration>;
  private readonly $datasourceSubject: Subject<Datasource>;

  renderSettingsObservable: Observable<ResourceTableRenderSettings>;

  constructor() {
    this.$configurationSubject = new ReplaySubject<ResourceTableConfiguration>();
    this.$datasourceSubject = new ReplaySubject<Datasource>();
    this.renderSettingsObservable = combineLatest([
      this.$configurationSubject,
      this.$datasourceSubject,
    ]).pipe(
      switchMap(([
                   {columns, showIndex = true},
                   datasource,
                 ]) => {
        return (datasource.data as Observable<any[]>).pipe(map(d => ({
          showIndex,
          datasource: datasource,
          columns: columns.map(c => c.name),
          rows: d.map(d => {
            return columns.map(({name, key = name, selectValue = (v) => v,}) => {
              return selectValue(d[key]);
            });
          }),
        })));
      }),
    )
  }

  ngOnInit() {
  }

}
