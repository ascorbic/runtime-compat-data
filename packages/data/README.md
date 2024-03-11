# runtime-compat-data

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

<!-- [![bundle][bundle-src]][bundle-href] -->
<!-- [![Codecov][codecov-src]][codecov-href] -->

This project provides machine-readable data on support for Web APIs and JavaScript features across non-browser JavaScript runtimes. The data format is the same as MDN's [`browser-compat-data`](https://github.com/mdn/browser-compat-data/), and it uses the runtime tests from [`mdn-bcd-collector`](https://github.com/openwebdocs/mdn-bcd-collector/).

The [WinterCG](https://wintercg.org/) project works to encourage compatibility between non-browser runtimes, but it does not provide data on the progress towards that goal. This project aims to fill that gap.

## Supported runtimes

Currently this tracks the following runtimes:

- [Bun](https://bun.sh/) (`bun`)
- [Deno](https://deno.land/) (`deno`)
- [Vercel Edge Runtime](https://edge-runtime.vercel.app/) (`edge-light`)
- [Fastly JS Compute Runtime](https://github.com/fastly/js-compute-runtime) (`fastly`)
- [Netlify Edge Functions](https://docs.netlify.com/edge-functions/overview/) (`netlify`)
- [Node.js](https://nodejs.org/) (`node`)
- [Cloudflare workerd](https://github.com/cloudflare/workerd) (`workerd`)

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

## License

Made with 💛

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/runtime-compat-data?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/runtime-compat-data
[npm-downloads-src]: https://img.shields.io/npm/dm/runtime-compat-data?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/runtime-compat-data

<!-- [codecov-src]: https://img.shields.io/codecov/c/gh/unjs/runtime-compat-data/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/unjs/runtime-compat-data

[bundle-src]: https://img.shields.io/bundlephobia/minzip/runtime-compat-data?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=runtime-compat-data -->
