import fs from "fs-extra";
import { typemonConfig } from "./typemonConfig.js";
import { TsConfigExists } from "../helpers/errorHandler.js";

const TsConfigFile = typemonConfig.tsConfig || "tsconfig.json";

let rootDir: string;
let outDir: string;

try {
  TsConfigExists(TsConfigFile);

  const tsConfigJSON = JSON.parse(fs.readFileSync(TsConfigFile, "utf8").replace(/\/\/.*|\/\*[\s\S]*?\*\//g, ""));
  rootDir = tsConfigJSON.compilerOptions.rootDir || process.cwd();
  outDir = tsConfigJSON.compilerOptions.outDir || process.cwd();
} catch (error) {
  console.error("Error occurred while reading or parsing Typecript config:", error);
}

export { rootDir, outDir };
