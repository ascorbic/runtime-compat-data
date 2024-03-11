/// <reference types="@fastly/js-compute" />

import { runTests } from "../../shared/test.js";
import tests from "../../../data/tests.json" assert { type: "json" };

// eslint-disable-next-line no-undef
addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

// eslint-disable-next-line require-await
async function handleRequest(event: FetchEvent) {
  if (event.request.method === "HEAD") {
    return new Response(undefined, { status: 200 });
  }
  const data = await runTests(tests);
  return new Response(JSON.stringify(data, undefined, 2));
}
