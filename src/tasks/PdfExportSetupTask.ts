import {SetupTask} from "./SetupTask";
import {Config} from "../config";
import {Session, SessionResult, executeScript, sync} from "../Session";

export class PdfExportSetupTask extends SetupTask {

  protected githubToken : string;

  constructor(config : Config, githubToken : string) {
    super(config);
    this.githubToken = githubToken;
  }

  public describe() : string {
    return 'Setting up Pdf Export Service configuration';
  }

  public run(session : Session) : Promise<SessionResult> {
    var vars = this.extendArgs({
        githubToken: this.githubToken,
    });
    return sync(
      (result : SessionResult) => executeScript(session, this.resolveScript(session, 'docker-install.sh')),
      (result : SessionResult) => executeScript(session, this.resolveScript(session, 'pdf-export-install.sh'), {vars: vars})
    );
  }
}
