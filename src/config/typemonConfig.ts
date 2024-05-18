import { validateTsConfigFileName } from "../helpers/errorHandler.js";
import fs from 'fs-extra'

const packageJSON = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const packageJsonMain = packageJSON?.main;

let typemonConfig = packageJSON?.typemonConfig;

/**
 * Typemon configuration settings.
 */

typemonConfig = {
    customTsConfigPath: typemonConfig?.tsConfig,
    main: typemonConfig?.main,
    delay: typemonConfig?.delay * 1000 // Convert sec to ms because of setTimeout, see ./monitor.ts
}

validateTsConfigFileName(typemonConfig.customTsConfigPath);

export { typemonConfig, packageJsonMain };
