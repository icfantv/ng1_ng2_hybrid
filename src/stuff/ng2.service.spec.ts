import {destroyPlatform} from '@angular/core';
import {async} from '@angular/core/testing';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {UpgradeModule} from '@angular/upgrade/static';

import {HelloWorldModule} from '../app.module';

import {NG1_MODULE} from './ng1.service';
import {NG2Service} from './ng2.service';


describe('test ng2 service', () => {
  let servicePromise: Promise<NG2Service>;

  beforeEach(() => destroyPlatform());
  afterEach(() => destroyPlatform());

  beforeEach(() => {
    const element = document.createElement('div');
    servicePromise = platformBrowserDynamic().
      bootstrapModule(HelloWorldModule).
      then(ref => {
        const upgrade = ref.injector.get(UpgradeModule) as UpgradeModule;
        upgrade.bootstrap(element, [NG1_MODULE]);
        return upgrade.injector.get(NG2Service);
    });
  });


  it('should return the right test message', async(() => {
    servicePromise.then(service => {
      expect(service.getMessage()).toBe('This is the NG2 Service.');
    });
  }));
});
