import {NG2Service} from './ng2.service';

describe('test ng2 service', () => {

  let service: NG2Service;
  beforeEach(() => {
    service = new NG2Service();
  });

  it('should return the right test message', () => {
    expect(service.getMessage()).toBe('This is the NG2 Service.');
  });
});
