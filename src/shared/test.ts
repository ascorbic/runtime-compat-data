import Tests from "../../lib/tests.ts";
import type { Test, TestResult } from "../../lib/types.ts";
// @ts-ignore
import setup from "../../lib/harness.js";

declare global {
  // eslint-disable-next-line no-var
  var bcd: {
    addTest: (ident: string, tests: any, exposure: string[]) => void;
    go: (callback: (done: TestResult[]) => void) => void;
  };
}

export interface TestConfig {
  __resources: unknown;
  [name: `${string}.${string}`]: Test;
}

export function runTests(
  tests: TestConfig,
  ignoreApis?: Array<string>,
): Promise<Array<string>> {
  setup(globalThis);
  const testCases = new Tests({ tests, httpOnly: false });
  for (const test of testCases.getTests("javascript.builtins")) {
    globalThis.bcd.addTest(test.ident, test.tests, test.exposure);
  }
  for (const test of testCases.getTests("api", "Window", ignoreApis)) {
    globalThis.bcd.addTest(test.ident, test.tests, test.exposure);
  }
  return new Promise((resolve) =>
    globalThis.bcd.go((done) => {
      const passing: Array<string> = [];
      for (const { result, name } of done) {
        if (result) {
          passing.push(name);
        }
      }
      resolve(passing);
    }),
  );
}
