import {Component, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {BehaviorSubject, Observable} from "rxjs";
import {IUserResource} from "@harpokrat/client";
import {debounceTime, switchMap} from "rxjs/operators";




@Component({
  selector: 'hpk-user-search-input',
  templateUrl: './user-search-input.component.html',
  styleUrls: ['./user-search-input.component.css']
})
export class UserSearchInputComponent implements OnInit, OnDestroy, ControlValueAccessor {

  open: boolean;

  private valueSubject: BehaviorSubject<string>;

  usersObservable: Observable<IUserResource[]>;

  get value(): string {
    return this.valueSubject.value;
  }

  set value(value: string) {
    console.log(value);
    this.valueSubject.next(value);
    if (this.onChange != null) {
      this.onChange(value);
    }
  }

  private onChange: (value: any) => any;

  disabled: boolean = false;

  constructor(
    private readonly userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.valueSubject = new BehaviorSubject<string>('');
    this.usersObservable = this.valueSubject.pipe(
      debounceTime(200),
      switchMap((v) => this.userService.readAll({
        size: 6,
        filters: {
          email: `%${v}%`,
        },
      }))
    )
  }

  ngOnDestroy(): void {
    this.valueSubject.complete();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = true;
  }

  writeValue(obj: any): void {
    this.valueSubject.next(obj);
  }
}
