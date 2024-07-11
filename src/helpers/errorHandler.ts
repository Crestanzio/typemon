import { ChildProcess } from "child_process";
import { killTsWatch } from "./killTsWatch.js";
import fs from "fs-extra";

// monitor.js
export function checkEntryPoint(entryPoint1: any, entryPoint2: any) {
  if (entryPoint1 || entryPoint2) {
    return entryPoint1 || entryPoint2;
  } else {
    console.error("typemon: Cannot find main file to execute, example: index.js");
    killTsWatch();
  }
}

export function onExit(currentProcess: ChildProcess, code: number | null, signal: NodeJS.Signals | null) {
  // SIDE EFFECT: Watcher when initialize events
  if (signal === "SIGTERM") {
    currentProcess.kill(); // Do not attempt to restart the process
    return;
  }
}

// typemonConfig.ts
export function validateTsConfigFileName(filename: string) {
  // Ensure that the filename is correct, ignore paths. Match tsconfig.json or tsconfig.anything.json
  const TsConfigRegex = /(?<!\s)tsconfig(\.[A-Za-z]+)?\.json$/;

  // Check if the file pattern is correct
  if (filename && !TsConfigRegex.test(filename)) {
    console.error("typemon: tsconfig filename is not valid");
    killTsWatch();
  }
}

// tsConfig.ts
export function TsConfigExists(tsConfig: string) {
  if (!fs.existsSync(tsConfig)) {
    console.log(`typemon: Cannot find ${tsConfig}, make sure the file exists or the path is correct`);
    killTsWatch();
  }
}
