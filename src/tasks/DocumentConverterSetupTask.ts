import {SetupTask} from "./SetupTask";
import {Config} from "../config";
import {Session, SessionResult, executeScript} from "../Session";

export class DocumentConverterSetupTask extends SetupTask {

  protected githubToken : string;

  constructor(config : Config, githubToken : string) {
    super(config);
    this.githubToken = githubToken;
  }

  public describe() : string {
    return 'Setting up Document Converter configuration';
  }

  public run(session : Session) : Promise<SessionResult> {
    var vars = this.extendArgs({
        githubToken: this.githubToken,
    });
    return executeScript(session, this.resolveScript(session, 'document-converter-install.sh'), {vars: vars});
  }
}
