import {SCRIPT_DIR, TEMPLATES_DIR} from "./Task";
import {DeployTask} from "./DeployTask";
import {Config} from "../config";

const fs = require('fs');
const path = require('path');
const util = require('util');

export class UploadTask extends DeployTask {

  protected srcPath : string;

  protected destPath : string;

  protected progress : boolean;

  constructor(config : Config, srcPath : string, destPath : string, progress : boolean = false) {
    super(config);
    this.srcPath = srcPath;
    this.destPath = destPath;
    this.progress = progress;
  }

  public describe() : string {
    return 'Uploading  ' + this.srcPath + ' to ' + this.destPath;
  }

  public build(taskList) {
    taskList.copy(this.describe(), {
      src: this.srcPath,
      dest: this.destPath,
      progressBar: this.progress,
    });
  }
}