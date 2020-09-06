import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {map, switchMap} from 'rxjs/operators';
import {merge, Observable, of, Subject} from 'rxjs';
import {UserService} from '../../services/user.service';
import {IResourceIdentifier, IUserResource} from '@harpokrat/client';

@Component({
  selector: 'hpk-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  edit: boolean;

  readonly userObservable: Observable<IUserResource>;

  readonly userSubject: Subject<IUserResource>;

  constructor(
    private readonly $authService: AuthService,
    private readonly $userService: UserService,
  ) {
    this.userSubject = new Subject<IUserResource>();
    this.userObservable = merge(
      $authService.tokenObservable.pipe(
        map((token) => token && $authService.currentUser),
        switchMap((linkage) => linkage == null ? of(null) : $userService.read((linkage as IResourceIdentifier).id)),
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

  onRegister(user: IUserResource) {
    this.edit = false;
  }
}
