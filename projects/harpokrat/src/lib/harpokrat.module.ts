import {ModuleWithProviders, NgModule} from '@angular/core';

@NgModule()
export class HarpokratModule {

  static forRoot(
    {
      serverUrl = 'https://api.harpokrat.com'
    }: {
      serverUrl?: string
    }): ModuleWithProviders {
    if (serverUrl.endsWith('/')) {
      serverUrl = serverUrl.substring(0, serverUrl.length - 1);
    }
    return {
      ngModule: HarpokratModule,
      providers: [{
        provide: 'serverUrl',
        useValue: serverUrl
      }]
    };
  }
}
