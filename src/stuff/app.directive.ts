import {module} from 'angular';
import {NG1_MODULE, NG1Service} from 'stuff/ng1.service';

class MainAppController {

  static get $inject(): string[] {
    return ['ng1service'];
  }

  constructor(private service: NG1Service) {}

  private message: string;
  private injectedMessage: string;

  public $onInit() {
    this.message = this.service.getServiceMessage();
    this.injectedMessage = this.service.getNg2Message();
  }
}

export class MainApp implements ng.IComponentOptions {

  public bindings: any;
  public controller: any;
  public template = `<div>Service Message: &gt;{{ $ctrl.message }}&lt;<br/>
                          NG2 Service Message: &gt;{{ $ctrl.injectedMessage }}&lt;</div>`;

  constructor() {
    this.controller = MainAppController;
  }
}

export const MAIN_APP = 'MAIN_APP';
module(MAIN_APP, [NG1_MODULE])
  .component('mainApp', new MainApp());
