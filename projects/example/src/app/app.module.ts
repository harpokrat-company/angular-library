import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HarpokratModule} from '../../../harpokrat/src/lib/harpokrat.module';
import {FormsModule} from '@angular/forms';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot([]),
    FormsModule,
    HarpokratModule.forRoot('https://api.dev.harpokrat.com/v1/', {loginRouterPath: '/login'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
