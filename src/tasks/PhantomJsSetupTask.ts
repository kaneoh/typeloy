import {SCRIPT_DIR, TEMPLATES_DIR} from "./Task";
import {SetupTask} from "./SetupTask";
import {Session, SessionResult, executeScript, sync} from "../Session";


const fs = require('fs');
const path = require('path');
const util = require('util');

export class PhantomJsSetupTask extends SetupTask {

  public describe() : string {
    return 'Installing PhantomJS';
  }

  public run(session : Session) : Promise<SessionResult> {
    return executeScript(session, this.resolveScript(session, 'phantomjs-install.sh'));
  }
}
