import {Injectable} from '@angular/core';
import {Location} from '@angular/common';

@Injectable()
export class NG2Service {

  constructor(private location: Location) {}

  public getMessage(): string {
    return 'This is the NG2 Service.';
  }

  public go(url: string) {
    this.location.go(url);
  }
}

export const NG2_MODULE = 'ng2.module';
