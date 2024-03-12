// A small wrapper to allow ESM imports on older NodeJS versions that don't support import assertions
import fs from "node:fs";
const data = JSON.parse(fs.readFileSync(new URL("data.json", import.meta.url)));
export default data;
