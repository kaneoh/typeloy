import {SCRIPT_DIR, TEMPLATES_DIR} from "./Task";
import {DeployTask} from "./DeployTask";
import {Config} from "../config";
import {Session, SessionResult, sync, copy} from "../Session";

export class CopyBundleDeployTask extends DeployTask {

  protected bundlePath : string;

  constructor(config : Config, bundlePath : string) {
    super(config);
    this.bundlePath = bundlePath;
  }

  public describe() : string {
    return 'Uploading bundle: ' + this.bundlePath;
  }

  public run(session : Session) : Promise<SessionResult> {
    const appName = this.config.app.name;
    const remoteBundlePath = this.deployPrefix + '/' + appName + '/tmp/bundle.tar.gz'
    console.log("Transfering " + this.bundlePath + ' => ' + remoteBundlePath);
    return copy(session, this.bundlePath,
         this.deployPrefix + '/' + appName + '/tmp/bundle.tar.gz',
         { progressBar: this.config.deploy.uploadProgress });
  }

  public build(taskList) {
    const appName = this.config.app.name;
    const remoteBundlePath = this.deployPrefix + '/' + appName + '/tmp/bundle.tar.gz'
    console.log("Transfering " + this.bundlePath + ' => ' + remoteBundlePath);
    taskList.copy(this.describe(), {
      src: this.bundlePath,
      dest: this.deployPrefix + '/' + appName + '/tmp/bundle.tar.gz',
      progressBar: this.config.deploy.uploadProgress
    });
  }
}
