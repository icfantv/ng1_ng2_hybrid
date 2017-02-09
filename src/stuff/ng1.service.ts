import {module} from 'angular';
import {NG2Service} from './ng2.service';

export class NG1Service {

  static get $inject() {
    return ['ng2service'];
  }

  constructor(private service: NG2Service) {}

  public getNg2Message() {
    return this.service.getMessage();
  }

  public getServiceMessage() {
    return 'This is the NG1 Service.';
  }
}

export const NG1_MODULE = 'ng1.module';
module(NG1_MODULE, []).service('ng1service', NG1Service);
