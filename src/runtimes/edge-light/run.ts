import { EdgeRuntime } from "edge-runtime";
import { runTests } from "../../shared/test.js";
import tests from "../../../data/tests.json" assert { type: "json" };
const runtime = new EdgeRuntime();
globalThis.eval = runtime.evaluate.bind(runtime);

const data = await runTests(tests);
console.log(JSON.stringify(data, undefined, 2));
