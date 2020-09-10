import {ModuleWithProviders, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {RouterModule} from '@angular/router';
import {LoginFormComponent} from './components/forms/login-form/login-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
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
import {RequestPasswordFormComponent} from './components/forms/request-password-form/request-password-form.component';
import {ResetPasswordFormComponent} from './components/forms/reset-password-form/reset-password-form.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfileViewerComponent} from './components/profile-viewer/profile-viewer.component';
import {HclwService} from '@harpokrat/hcl';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';
import {OrganisationFormComponent} from './components/forms/organisation-form/organisation-form.component';
import {OrganisationDeleteFormComponent} from './components/forms/organisation-delete-form/organisation-delete-form.component';
import {GroupFormComponent} from './components/forms/group-form/group-form.component';
import {GroupDeleteFormComponent} from './components/forms/group-delete-form/group-delete-form.component';
import {VaultFormComponent} from './components/forms/vault-form/vault-form.component';
import {VaultDeleteFormComponent} from './components/forms/vault-delete-form/vault-delete-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
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
    ResetPasswordFormComponent,
    ProfileComponent,
    ProfileViewerComponent,
    OrganisationFormComponent,
    OrganisationDeleteFormComponent,
    GroupFormComponent,
    GroupDeleteFormComponent,
    VaultFormComponent,
    VaultDeleteFormComponent
  ],
  exports: [
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
    ResetPasswordFormComponent,
    ProfileComponent,
    ProfileViewerComponent,
    OrganisationFormComponent,
    OrganisationDeleteFormComponent,
    GroupFormComponent,
    GroupDeleteFormComponent,
    VaultFormComponent,
    VaultDeleteFormComponent,
  ]
})
export class HarpokratModule {

  static forRoot(
    serverUrl,
    auth: {
      loginRouterPath: string
    }): ModuleWithProviders<HarpokratModule> {
    const service = new HclwService();
    return {
      ngModule: HarpokratModule,
      providers: [{
        provide: 'serverUrl',
        useValue: serverUrl
      }, {
        provide: 'loginRouterPath',
        useValue: auth.loginRouterPath
      }, {
        provide: 'hclw',
        useValue: service,
      }, {
        provide: HclwService,
        useValue: service,
      }, {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      }]
    };
  }
}
