import {BaseAction} from './BaseAction';

import {Config} from '../config';
import Deployment from '../Deployment';

export class RestartAction extends BaseAction {
  public run(deployment : Deployment) {
    return this._executePararell("restart", deployment, [this.config.appName]);
  }
}
