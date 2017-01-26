import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UpgradeModule, downgradeInjectable} from '@angular/upgrade/static';
import {NG2_MODULE, NG2Service} from 'stuff/ng2.service';

declare let angular: any;
angular.module(NG2_MODULE, [])
  .factory('ng2service', downgradeInjectable(NG2Service));

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  providers: [
    NG2Service
  ]
})
export class HelloWorldModule {
  ngDoBootstrap() {}
}
