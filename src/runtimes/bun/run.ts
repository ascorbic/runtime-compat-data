import { runTests } from "../../shared/test.js";
import tests from "../../../data/tests.json" assert { type: "json" };

const data = await runTests(tests);
console.log(JSON.stringify(data, undefined, 2));
