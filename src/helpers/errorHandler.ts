import { ChildProcess } from "child_process";
import { killTsWatch } from "./killTsWatch.js";
// import { ChildProcess } from "child_process";
import fs from "fs-extra";

// monitor.js
export function checkEntryPoint(entryPoint1: any, entryPoint2: any) {
  if (entryPoint1 || entryPoint2) {
    return entryPoint1 || entryPoint2;
  } else {
    console.error("ts-Watcher: Cannot find main file to execute, example: index.js");
    killTsWatch();
  }
}

export function onExit(currentProcess: ChildProcess, code: number | null, signal: NodeJS.Signals | null) {
  // SIDE EFFECT: Watcher when initialize events
  if (signal === "SIGTERM") {
    currentProcess.kill(); // Do not attempt to restart the process
    return;
  }

  if (code !== 0) {
    console.error(`ts-watcher: Process exited with code ${code} and signal ${signal}.`);
  }
}

export function onError(err: Error) {
  console.error("ts-watcher: Error occurred while restarting the process:", err);
}

// typemonConfig.ts
export function validateTsConfigFileName(filename: string) {
  // Ensure that the filename is correct, ignore paths. Match tsconfig.json or tsconfig.config.json
  const TsConfigRegex = /(?<!\s)tsconfig(\.[A-Za-z]+)?\.json$/;

  // Check if the file pattern is correct
  if (filename && !TsConfigRegex.test(filename)) {
    console.error("ts-watcher: tsConfig filename is not valid");
    killTsWatch();
  }
}

// tsConfig.ts
export function TsConfigExists(TsConfig: string) {
  if (!fs.existsSync(TsConfig)) {
    console.log(`ts-watcher: Cannot find ${TsConfig}, make sure the file exists or the path is correct`);
    killTsWatch();
  }
}
