import {SCRIPT_DIR, TEMPLATES_DIR} from "./Task";
import {Task} from "./Task";

const fs = require('fs');
const path = require('path');
const util = require('util');

export class StopTask extends Task {

  public describe() : string {
    return `Stop ${this.config.app.name}`;
  }

  public build(taskList) {
    taskList.executeScript(this.describe(), {
      'script': path.resolve(TEMPLATES_DIR, 'service/stop'),
      'vars': this.extendArgs({ })
    });
  }
}