import {BaseAction} from './BaseAction';

import Deployment from '../Deployment';

export class StopAction extends BaseAction {
  public run(deployment : Deployment) {
    return this._executePararell("stop", deployment, [this.config.appName]);
  };
}
