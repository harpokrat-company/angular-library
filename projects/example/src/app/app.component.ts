import {Component} from '@angular/core';
import {UserService} from '../../../harpokrat/src/lib/services/user.service';
import {Observable} from 'rxjs';
import {Resource} from '../../../harpokrat/src/lib/models/resource';
import {User} from '../../../harpokrat/src/lib/models/domain/user';
import {Token} from '../../../harpokrat/src/lib/models/domain/token';
import {TokenService} from '../../../harpokrat/src/lib/services/token.service';
import {Password} from '../../../harpokrat/src/lib/models/domain/password';
import {PasswordService} from '../../../harpokrat/src/lib/services/password.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  email = 'a@a.a';

  userObservable: Observable<Resource<User>>;
  tokenObservable: Observable<Resource<Token>>;
  passwordObservables: Observable<Resource<Password>[]>;
  passwordObservable: Observable<Resource<Password>>;

  constructor(private userService: UserService,
              private tokenService: TokenService,
              private passwordService: PasswordService) {
  }

  addUser() {
    this.userObservable = this.userService.create({
      email: this.email,
      password: 'abcd1234',
      firstName: 'Aled',
      lastName: 'Oskour'
    });
  }

  login() {
    this.tokenObservable = this.tokenService.login(this.email, 'abcd1234');
  }

  getPasswords() {
    this.passwordObservables = this.passwordService.readAll();
  }

  addPassword() {
    this.passwordObservable = this.passwordService.create({content: 'aled'});
  }

}
