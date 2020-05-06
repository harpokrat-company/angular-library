import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {map, switchMap} from "rxjs/operators";
import {merge, Observable, of, Subject} from "rxjs";
import {User} from "../../models/domain/user";
import {UserService} from "../../services/user.service";
import {ResourceIdentifier} from "../../models/resource-identifier";
import {Resource} from "../../models/resource";

@Component({
  selector: 'hpk-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  edit: boolean;

  readonly userObservable: Observable<Resource<User>>;

  readonly userSubject: Subject<Resource<User>>;

  constructor(
    private readonly $authService: AuthService,
    private readonly $userService: UserService,
  ) {
    this.userSubject = new Subject<Resource<User>>();
    this.userObservable = merge(
      $authService.tokenObservable.pipe(
        map((token) => token && $authService.currentUser),
        switchMap((linkage) => linkage == null ? of(null) : $userService.read((linkage as ResourceIdentifier).id)),
      ),
      this.userSubject,
    );
  }

  ngOnInit(): void {
    this.edit = false;
  }

  ngOnDestroy(): void {
    this.userSubject.complete();
  }

  onRegister(user: Resource<User>) {
    this.edit = false;
  }
}
