import { validateTsConfigFileName } from "../helpers/errorHandler.js";
import fs from 'fs-extra'

const packageJSON = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const packageJsonMain = packageJSON?.main;

let typemonConfig = packageJSON?.typemonConfig;

/**
 * Typemon configuration settings.
 */

typemonConfig = {
    main: typemonConfig?.main,
    tsConfig: typemonConfig?.tsConfig,
    delay: typemonConfig?.delay * 1000 // Convert sec to ms because of setTimeout, see ./monitor.ts
}

validateTsConfigFileName(typemonConfig.tsConfig);

export { typemonConfig, packageJsonMain };
