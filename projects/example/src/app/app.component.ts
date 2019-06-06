import {Component} from '@angular/core';
import {UserService} from '../../../harpokrat/src/lib/services/user.service';
import {Observable} from 'rxjs';
import {Resource} from '../../../harpokrat/src/lib/models/resource';
import {User} from '../../../harpokrat/src/lib/models/domain/user';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userObservable: Observable<Resource<User>>;

  constructor(private userService: UserService) {
  }

  addUser() {
    this.userObservable = this.userService.create({
      email: 'a@a.a',
      password: 'abcd1234',
      firstName: 'Aled',
      lastName: 'Oskour'
    }).pipe(tap((r) => {
      console.log(r);
    }, (e) => {
      console.error(e);
    }));
  }

}
