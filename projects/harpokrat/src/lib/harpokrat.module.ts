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
import {SecretViewerComponent} from './components/secret-viewer/secret-viewer.component';
import {SecretComponent} from './components/secret/secret.component';
import {SecretDeleteFormComponent} from './components/forms/secret-delete-form/secret-delete-form.component';
import {DeleteFormComponent} from './components/forms/delete-form/delete-form.component';
import {SecureActionComponent} from './components/secure-action/secure-action.component';
import {ValidateEmailAddressFormComponent} from './components/forms/validate-email-address-form/validate-email-address-form.component';
import { RequestPasswordFormComponent } from './components/forms/request-password-form/request-password-form.component';
import { ResetPasswordFormComponent } from './components/forms/reset-password-form/reset-password-form.component';

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
    FormComponent,
    SecretViewerComponent,
    SecretComponent,
    SecretDeleteFormComponent,
    DeleteFormComponent,
    SecureActionComponent,
    ValidateEmailAddressFormComponent,
    RequestPasswordFormComponent,
    ResetPasswordFormComponent
  ],
  exports: [
    LoginFormComponent,
    RegisterFormComponent,
    SecretsTableComponent,
    SecretFormComponent,
    SecretViewerComponent,
    SecretComponent,
    SecureActionComponent,
    RequestPasswordFormComponent
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
