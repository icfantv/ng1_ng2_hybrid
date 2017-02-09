import {SpyLocation} from '@angular/common/testing';
import {TestBed, inject} from '@angular/core/testing';

import {NG2Service} from './ng2.service';

describe('test ng2 service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpyLocation]
    });
  });

  let _location: SpyLocation;
  let service: NG2Service;
  beforeEach(inject([SpyLocation], (location: SpyLocation) => {
    _location = location;
    service = new NG2Service(location);
  }));

  it('should return the right test message', () => {
    expect(service.getMessage()).toBe('This is the NG2 Service.');
  });

  it('should route to the requested URL', (done) => {
    const url = 'http://google.com';
    _location.subscribe(
      (value: any) => {
        expect(value['url']).toBe(`/${url}`);  // leading "/" hackery due to possible bug in SpyLocation?
        done();
      }
    );

    service.go(url);
  });
});
