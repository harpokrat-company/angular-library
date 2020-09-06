import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../../../harpokrat/src/lib/services/auth.service';
import {SecretService} from '../../../harpokrat/src/lib/services/secret.service';
import {HclwService, Secret} from '@harpokrat/hcl';
import {map} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {IResource, ISecureActionResource} from '@harpokrat/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly sampleSecret: Observable<IResource<Secret>>;
  readonly sampleSecureAction: ISecureActionResource;

  readonly authenticatedObservable: Observable<boolean>;

  constructor(
    private readonly authService: AuthService,
    private readonly $secretService: SecretService,
    private readonly $hclwService: HclwService,
  ) {
    this.authenticatedObservable = authService.authenticatedObservable;
    this.sampleSecureAction = {
      type: 'secure_action',
      id: '',
      attributes: {
        actionType: 'reset_password',
      },
    };
    this.sampleSecret = fromPromise($hclwService.createSecret()).pipe(
      map((s) => {
        s.name = 'A';
        s.login = 'B';
        s.password = 'C';
        s.domain = 'D';
        return {
          type: '',
          id: 'aled',
          attributes: s,
        };
      }),
    );
  }

}
