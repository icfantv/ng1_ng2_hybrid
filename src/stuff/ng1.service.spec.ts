import {destroyPlatform, NgModule} from '@angular/core';
import {Location, PathLocationStrategy, LocationStrategy, APP_BASE_HREF} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {UpgradeModule, downgradeInjectable} from '@angular/upgrade/static';

import * as angular from 'angular';

import {bootstrap, html} from './helpers';
import {NG1_MODULE, NG1Service} from './ng1.service';
import {NG2_MODULE, NG2Service} from 'stuff/ng2.service';

describe('test ng1 service', () => {

  beforeEach(() => destroyPlatform());
  afterEach(() => destroyPlatform());

  it('should run all the tests', (done) => {

    @NgModule({
      imports: [BrowserModule, UpgradeModule],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: LocationStrategy, useClass: PathLocationStrategy},
        Location,
        NG2Service
      ]
    })
    class TestModule {
      ngDoBootstrap() {}
    }

    const mod: any =
      angular.module(NG2_MODULE, []).factory('ng2service', downgradeInjectable(NG2Service));
    bootstrap(platformBrowserDynamic(), TestModule, html('<div>'), [mod.name, NG1_MODULE])
      .then((upgrade) => {
        const injector: any = upgrade.$injector;
        let $timeout: ng.ITimeoutService = injector.get('$timeout');
        expect($timeout).toBeDefined();

        let ng2Service: NG2Service = upgrade.$injector.get('ng2service') as NG2Service;
        expect(ng2Service).toBeDefined();

        let ng1Service: NG1Service = upgrade.$injector.get('ng1service') as NG1Service;
        expect(ng1Service).toBeDefined();
        expect(ng1Service.getServiceMessage()).toBe('This is the NG1 Service.');
        expect(ng1Service.getNg2Message()).toBe('This is the NG2 Service.');
        done();
      });
  });
});
