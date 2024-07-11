import { checkEntryPoint, onExit } from "./helpers/errorHandler.js";
import { typemonConfig, packageJsonMain } from "./config/typemonConfig.js";
import { ChildProcess, spawn } from "child_process";

// Store the child process
let currentProcess: ChildProcess;

function restartProcess() {
  // Kill the previous process if it exists
  if (currentProcess) { currentProcess.kill(); }

  // Start the new process
  const monitor = spawn("node", [checkEntryPoint(typemonConfig.main, packageJsonMain)], { stdio: "inherit" });
  monitor.on("exit", (code, signal) => onExit(currentProcess, code, signal));
  
  // Update the current process
  currentProcess = monitor;
}

// Initial call of monitor process
setTimeout(restartProcess, typemonConfig.delay || 2100); // Delay because of typescript monitor, wait to complete and after show the output

export { restartProcess };
