import {Component} from '@angular/core';
import {UserService} from '../../../harpokrat/src/lib/services/user.service';
import {Observable} from 'rxjs';
import {Resource} from '../../../harpokrat/src/lib/models/resource';
import {User} from '../../../harpokrat/src/lib/models/domain/user';
import {Token} from '../../../harpokrat/src/lib/models/domain/token';
import {TokenService} from '../../../harpokrat/src/lib/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userObservable: Observable<Resource<User>>;
  tokenObservable: Observable<Resource<Token>>;

  constructor(private userService: UserService,
              private tokenService: TokenService) {
  }

  addUser() {
    this.userObservable = this.userService.create({
      email: 'a@a.a',
      password: 'abcd1234',
      firstName: 'Aled',
      lastName: 'Oskour'
    });
  }

  login() {
    this.tokenObservable = this.tokenService.login('a@a.a', 'abcd1234');
  }

}
