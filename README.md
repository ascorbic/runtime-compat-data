# runtime-compat-data

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

<!-- [![bundle][bundle-src]][bundle-href] -->
<!-- [![Codecov][codecov-src]][codecov-href] -->

This project provides machine-readable data on support for Web APIs and JavaScript features across non-browser JavaScript runtimes. The data format is the same as MDN's [`browser-compat-data`](https://github.com/mdn/browser-compat-data/), and it uses the runtime tests from [`mdn-bcd-collector`](https://github.com/openwebdocs/mdn-bcd-collector/). It includes most runtimes that are members of the [WinterCG](https://wintercg.org/) project, and can be used to track the goal of improving web-interoperability across different runtimes.

## Supported runtimes

Currently this tracks the following JavaScript runtimes (shown with their [WinterCG runtime key](https://runtime-keys.proposal.wintercg.org/)):

- [Bun](https://bun.sh/) (`bun`)
- [Deno](https://deno.land/) (`deno`)
- Vercel [Edge Runtime](https://edge-runtime.vercel.app/) (`edge-light`)
- Fastly [JS Compute Runtime](https://github.com/fastly/js-compute-runtime) (`fastly`)
- Netlify [Edge Functions](https://docs.netlify.com/edge-functions/overview/) (`netlify`)
- [Node.js](https://nodejs.org/) (`node`)
- Cloudflare [workerd](https://github.com/cloudflare/workerd) (`workerd`)

## Usage

The module exports a JSON file, and it can be imported directly using ESM with import assertions, or using a CommonJS require statement. There is also a wrapper for ESM in older versions of Node.js that do not support import assertions.

It is published to npm, but can also be loaded from a CDN.

### npm

Install the package:

```sh
# npm
npm install runtime-compat-data

# yarn
yarn add runtime-compat-data

# pnpm
pnpm install runtime-compat-data

# bun
bun install runtime-compat-data
```

```js
// ESM with Import Assertions (Node.js 16+)
import data from "runtime-compat-data" assert { type: "json" };
// ...or...
const { default: data } = await import("runtime-compat-data", {
  assert: { type: "json" },
});
// ...or...

// ESM Wrapper for older Node.js versions (Node.js v12+)
import data from "runtime-compat-data/forLegacyNode";
// ...or...
const { default: data } = await import("runtime-compat-data/forLegacyNode");

// ...or...

// CommonJS Module (Any Node.js)
const data = require("runtime-compat-data");
```

### CDN

For Deno or the browser, you can load the data from a CDN:

```js
import data from "https://unpkg.com/runtime-compat-data" assert { type: "json" };
// ...or...
const { default: data } = await import(
  "https://unpkg.com/runtime-compat-data",
  {
    assert: { type: "json" },
  }
);
```

## Data format

The data follows the same format as MDN's [`browser-compat-data`](https://github.com/mdn/browser-compat-data), but only includes the `javascript` and `api` keys. Instead of the browser keys in MDN's data, this project uses the runtime keys from the [WinterCG runtime key proposal](https://runtime-keys.proposal.wintercg.org/). The data doesn't currently track versions where the feature was added, and just includes a boolean for whether the feature is supported in the current runtime.

Example data:

```json
{
  "api": {
    "URLPattern": {
      "__compat": {
        "mdn_url": "https://developer.mozilla.org/docs/Web/API/URLPattern",
        "source_file": "api/URLPattern.json",
        "spec_url": "https://urlpattern.spec.whatwg.org/#urlpattern",
        "status": {
          "deprecated": false,
          "experimental": true,
          "standard_track": true
        },
        "support": {
          "bun": { "version_added": false },
          "deno": { "version_added": true },
          "edge-light": { "version_added": true },
          "fastly": { "version_added": false },
          "netlify": { "version_added": true },
          "node": { "version_added": false },
          "workerd": { "version_added": true }
        }
      }
    }
  }
}
```

The data is heirarchical, with the feature at the top level and then properties nested below it. Each level has a `__compat` key that contains the compatibility data for that item. The `support` key in that contains the compatibility data for each runtime.

For example, the `TextEncoder` key has this structure:

- `TextEncoder`
  - `__compat` (shows compatibility for the feature itself)
  - `TextEncoder`
    - `__compat` (shows compatibility for the `TextEncoder` object)
  - `encodeInto`
    - `__compat` (shows compatibility for the `encodeInto` method)
  - `encode`
    - `__compat` (shows compatibility for the `encode` method)

## How the data is generated

The list of APIs is generated by the [browser-compat-data](https://githib.com/mdn/browser-compat-data) project. The features that we include can be found in the `api` and `javascript/builtins` directories. The tests are provided by the [mdn-bcd-collector](Hhttps://github.com/openwebdocs/mdn-bcd-collector/) project. These are a mixture of automatically-generated tests for globals and properties, and manually-written tests for individual options. You can find the current tests in the `data` directory. This file is automatically generated from the `mdn-bcd-collector` repo.

These tests are designed to be run in a browser environment, so we use a slightly modified version of the test harness to allow them to run in the runtimes we support. The code for testing each of the runtimes is found in the `src/runtimes` directory. It is slightly different for each runtime, depending on how each is designed to be used. Some (such as Bun, Deno and Node) can run the test file directly from the CLI, while others expect to be run via a server. For these we use the project's own development server, and then use `start-server-and-test` to run the server and make a request for a funciton that runs the test file. Each of these generates a JSON response that shows the passing tests.

Another script then processes these, combines them with the metadata from the `browser-compat-data` project, and then writes the data as a JSON file to the `packages/runtime-compat-data` directory. This is then published to npm.

The tests can be run locally, but the actual data generation process is run nightly on GitHib Actions, which opens a PR if there are any changes.

## Running locally

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Install [Bun](https://bun.sh/)
- Install [Fastly CLI](https://www.fastly.com/documentation/reference/tools/cli/)
- Install [Netlify CLI](https://docs.netlify.com/cli/get-started/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Generate the data using `pnpm run generate`

If you want to run the tests for an individual runtime, run `pnpm start` in the `src/runtimes/<runtime>` directory. If you set `DEBUG=1` then it will log messages for test failures.

## Limitations

The tests are only run against the latest stable version of each runtime, so the data only shows whether the feature is supported now. This is because the goal of the project is to track the current state, and not to track historical support. In most cases these runtimes are updated regularly, so this should not be a problem. The exception is Node.js, which is often run using old version. For this you may like to compare the data with the MDN docs, which include support details for old versions of Node.

The actual tests are designed to run in browsers, so there may be inconsistencies. For the same reason, they also do not test for any WinterCG-specific features.

Several supported runtimes are normally used via a hosted service. These are tested locally using a development library or server, which may differ from the production environment.

Some runtimes may define a particular API object or method, but as a stub or noop rather than as an actual feature. In most cases this will be shown as being supported. Usually these feature make no sense outside a browser environment, but have been implemented to allow code to run cross-platform.

### Notes for specific runtimes

#### Deno

Deno is tested using the `deno` CLI, which has different support than the Deno Deploy service which has more limitations and often has features added on a adifferent schedule.

#### Vercel Edge Runtime

Tests are run against the open source Edge Runtime library (identified with the key `edge-light`) which run in Node. This is designed to be identical to the Vercel Edge Runtime (which is based on `workerd`), but there may be differences.

#### Netlify

Tests are run using the Netlify CLI, which uses Deno. While this does use settings designed to mimic the production version, there may be differences.

## Contributing

If you want to add a new runtime, please open an issue to discuss it first. Runtimes are added in `src/runtimes`.

## License

Created by [Matt Kane](https://mk.gg/).

Files in `lib` and `data` are based on code from Open Web Docs, copyright Gooborg Studios, Google LLC, Mozilla Corporation, Apple Inc and are published under the Apache Licence.

The generated data `runtime-compat-data` in `packages` (published to npm and unpkg) is licenced under CC0 (no rights reserved). It includes data from MDN, also published under the CC0 licence.

All other test and runtime code in this project is copyright Matt Kane and published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/runtime-compat-data?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/runtime-compat-data
[npm-downloads-src]: https://img.shields.io/npm/dm/runtime-compat-data?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/runtime-compat-data

<!-- [codecov-src]: https://img.shields.io/codecov/c/gh/unjs/runtime-compat-data/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/unjs/runtime-compat-data

[bundle-src]: https://img.shields.io/bundlephobia/minzip/runtime-compat-data?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=runtime-compat-data -->
