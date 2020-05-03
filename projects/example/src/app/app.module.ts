import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HarpokratModule} from '../../../harpokrat/src/lib/harpokrat.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HclwModule} from "@harpokrat/hcl";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    HclwModule,
    HarpokratModule.forRoot('https://api.harpokrat.com/v1', {loginRouterPath: '/login'}),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
