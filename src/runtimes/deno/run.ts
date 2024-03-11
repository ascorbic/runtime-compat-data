import { runTests } from "../../shared/test.ts";
import tests from "../../../data/tests.json" assert { type: "json" };
import { gpu } from "../../shared/features.ts";

const data = await runTests(tests, gpu);
console.log(JSON.stringify(data, undefined, 2));
