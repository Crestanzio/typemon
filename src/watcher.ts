import { rootDir, outDir } from "./config/tsConfig.js";
import { restartProcess } from "./monitor.js";
import Watcher from "watcher";
import fs from "fs-extra";
import path from "path";

const options = { renameDetection: true, recursive: true, persistent: true };
const watcher = new Watcher(rootDir, options)

function typemon() {
watcher.on("error",     (error)                       => console.log(error instanceof Error));

// Files
watcher.on("change",    (filePath)                    => (handleChange(filePath), restartProcess()));
watcher.on("add",       (filePath)                    => (handleAddFile(filePath), restartProcess()));
watcher.on("unlink",    (filePath)                    => (handleDeleteFile(filePath), restartProcess()));
watcher.on("rename",    (filePathPrev, filePathNext)  => (handleRenameFile(filePathPrev, filePathNext), restartProcess()));

// Directories
watcher.on("addDir",    (directoryPath)               => (handleAddDir(directoryPath), restartProcess()));
watcher.on("unlinkDir", (directoryPath)               => (handleDeleteDir(directoryPath), restartProcess()));
watcher.on("renameDir", (DirPathprev, DirPathnext)    => (handleRenameDir(DirPathprev, DirPathnext), restartProcess()));
}

function handleChange(file: string) {
  if (file.endsWith(".ts")) return;
  fs.copyFile(file, getDestPath(file))
}

function handleAddFile(file: string) {
  if (file.endsWith(".ts")) return;
  fs.copy(file, getDestPath(file));
}

function handleDeleteFile(file: string) {
  if (file.endsWith(".ts")) {
    fs.remove(getDestPath(file).replace(".ts", ".js"));
  } else {
    fs.remove(getDestPath(file));
  }
}

function handleRenameFile(prev: string, next: string) {
  if (prev.endsWith(".ts")) {
    fs.remove(getDestPath(prev).replace(".ts", ".js"));
  } else {
    fs.remove(getDestPath(prev));
    fs.copy(next, getDestPath(next));
  }
}

function handleAddDir(directory: string) {
  if (fs.existsSync(directory)) return;
  fs.mkdir(directory, getDestPath(directory))
}

function handleDeleteDir(file: string) {
  fs.remove(getDestPath(file));
}

function handleRenameDir(prev: string, next: string) {
  fs.remove(getDestPath(prev));
  fs.copy(next, getDestPath(next));
}

function getDestPath(currentPath: string) {
  return path.join(outDir, path.relative(rootDir, currentPath));
}

export { typemon }