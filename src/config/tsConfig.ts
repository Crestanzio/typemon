import fs from "fs-extra";
import { typemonConfig } from "./typemonConfig.js";
import { TsConfigExists } from "../helpers/errorHandler.js";

const TsConfigFile = typemonConfig.customTsConfigPath || "tsconfig.json";

let rootDir: string;
let outDir: string;

try {
  TsConfigExists(TsConfigFile);

  const tsConfig = JSON.parse(fs.readFileSync(TsConfigFile, "utf8").replace(/\/\/.*/g, "").replace(/\/\*[\s\S]*?\*\//g, ""));
  rootDir = tsConfig.compilerOptions.rootDir || process.cwd();
  outDir = tsConfig.compilerOptions.outDir || process.cwd();
} catch (error) {
  console.error("Error occurred while reading or parsing Typecript config:", error);
}

export { rootDir, outDir };
