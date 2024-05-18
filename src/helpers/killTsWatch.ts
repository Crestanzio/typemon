import { exec } from "child_process";

const killTsWatch = () => exec("pkill -f 'tsc (--watch|-w)'") && process.exit(1);

export { killTsWatch };
