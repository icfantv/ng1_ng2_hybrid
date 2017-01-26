import {Injectable} from '@angular/core';

@Injectable()
export class NG2Service {
  public getMessage(): string {
    return 'This is the NG2 Service.';
  }
}

export const NG2_MODULE = 'ng2.module';
