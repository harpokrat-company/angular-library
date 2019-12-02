import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from "../../../harpokrat/src/lib/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly authenticatedObservable: Observable<boolean>;

  constructor(private readonly authService: AuthService) {
    this.authenticatedObservable = authService.authenticatedObservable;
  }

}
