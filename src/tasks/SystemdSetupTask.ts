import {SCRIPT_DIR, TEMPLATES_DIR} from "./Task";
import {SetupTask} from "./SetupTask";
import {Config, AppConfig} from "../config";
import {Session, SessionResult, executeScript, copy} from "../Session";

import fs from 'fs';
import path from 'path';

const util = require('util');

export class SystemdSetupTask extends SetupTask {

  public describe() : string {
    return 'Configuring systemd: ' + this.getConfigPath();
  }

  protected getConfigPath() : string {
    return `/lib/systemd/system/${this.getAppName()}.service`;
  }

  public run(session : Session) : Promise<SessionResult> {
    return copy(session,
      this.resolveTemplate(session, 'meteor/systemd.conf'),
      this.getConfigPath(), {
        'vars': this.extendArgs({ })
      });
  }

  public build(taskList) {
    taskList.copy(this.describe(), {
      'src': path.resolve(TEMPLATES_DIR, 'meteor/systemd.conf'),
      'dest': this.getConfigPath(),
      'vars': this.extendArgs({}),
    });
  }
}
