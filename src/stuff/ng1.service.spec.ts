import {destroyPlatform} from '@angular/core';
import {async} from '@angular/core/testing';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {UpgradeModule} from '@angular/upgrade/static';

import {HelloWorldModule} from '../app.module';

import {NG1_MODULE, NG1Service} from './ng1.service';
import {NG2_MODULE} from './ng2.service';


describe('test ng1 service', () => {
  let servicePromise: Promise<NG1Service>;

  beforeEach(() => destroyPlatform());
  afterEach(() => destroyPlatform());

  beforeEach(() => {
    const element = document.createElement('div');
    servicePromise = platformBrowserDynamic().
      bootstrapModule(HelloWorldModule).
      then(ref => {
        const upgrade = ref.injector.get(UpgradeModule) as UpgradeModule;
        upgrade.bootstrap(element, [NG1_MODULE, NG2_MODULE]);
        return upgrade.$injector.get('ng1service');
      });
  });


  it('(ng1) should return the right test message', async(() => {
    servicePromise.then(service => {
      expect(service.getServiceMessage()).toBe('This is the NG1 Service.');
    });
  }));

  it('should return the injected message', () => {
    servicePromise.then(service => {
      expect(service.getServiceMessage()).toBe('This is the NG1 Service.');
    });
  });
});
