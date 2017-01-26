import {mock} from 'angular';

import {NG1_MODULE, NG1Service} from './ng1.service';
import {NG2_MODULE} from 'stuff/ng2.service';

describe('test ng1 service', () => {

  let service: NG1Service;

  beforeEach(mock.module(NG1_MODULE, NG2_MODULE));

  beforeEach(mock.inject(
    function (_ng1service_: NG1Service) {
      service = _ng1service_;
    }
  ));

  it('(ng1) should return the right test message', () => {
    expect(service.getServiceMessage()).toBe('This is the NG1 Service.');
  });

  it('should return the injected message', () => {
    expect(service.getNg2Message()).toBe('Always look on the bright side of life.');
  });
});
