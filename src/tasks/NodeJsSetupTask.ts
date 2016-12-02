import {SCRIPT_DIR, TEMPLATES_DIR} from "./Task";
import {SetupTask} from "./SetupTask";
import {Session, SessionResult, executeScript, sync} from "../Session";



const fs = require('fs');
const path = require('path');
const util = require('util');

export class NodeJsSetupTask extends SetupTask {

  public describe() : string {
    return 'Installing Node.js: ' + this.getNodeVersion();
  }

  protected getNodeVersion() {
    return this.config.setup.node || '0.10.44';
  }

  public run(session : Session) : Promise<SessionResult> {
    return executeScript(session, this.resolveScript(session, 'node-install.sh'), {
      "vars": this.extendArgs({
        nodeVersion: this.getNodeVersion()
      })
    });
  }
}
