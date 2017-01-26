import 'ts-helpers';
import * as angular from 'angular';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {UpgradeModule} from '@angular/upgrade/static';

import {HelloWorldModule} from 'app.module';
import {MAIN_APP} from 'stuff/app.directive';
import {NG2_MODULE} from 'stuff/ng2.service';

angular.module('hello.world', [MAIN_APP, NG2_MODULE]);

platformBrowserDynamic().bootstrapModule(HelloWorldModule).then(platformRef => {
  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.body, ['hello.world']);
});
