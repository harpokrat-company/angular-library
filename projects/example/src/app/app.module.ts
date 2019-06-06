import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HarpokratModule} from '../../../harpokrat/src/lib/harpokrat.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    HarpokratModule.forRoot('https://api.harpokrat.com/v1', {loginRouterPath: '/login'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}