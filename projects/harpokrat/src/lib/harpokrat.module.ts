import {ModuleWithProviders, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {RouterModule} from '@angular/router';
import {LoginFormComponent} from './components/forms/login-form/login-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ErrorAlertComponent} from './components/alerts/error-alert/error-alert.component';
import {RegisterFormComponent} from './components/forms/register-form/register-form.component';
import {ResourceTableComponent} from './components/tables/resource-table/resource-table.component';
import {SecretsTableComponent} from './components/tables/secrets-table/secrets-table.component';
import {PagerComponent} from './components/tables/pager/pager.component';
import {SecretFormComponent} from './components/forms/secret-form/secret-form.component';
import {FormComponent} from './components/forms/form/form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    LoginFormComponent,
    ErrorAlertComponent,
    RegisterFormComponent,
    ResourceTableComponent,
    SecretsTableComponent,
    PagerComponent,
    SecretFormComponent,
    FormComponent
  ],
  exports: [
    LoginFormComponent,
    RegisterFormComponent,
    SecretsTableComponent,
    SecretFormComponent
  ]
})
export class HarpokratModule {

  static forRoot(
    serverUrl,
    auth: {
      loginRouterPath: string
    }): ModuleWithProviders<HarpokratModule> {
    return {
      ngModule: HarpokratModule,
      providers: [{
        provide: 'serverUrl',
        useValue: serverUrl
      }, {
        provide: 'loginRouterPath',
        useValue: auth.loginRouterPath
      }, {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      }]
    };
  }
}
