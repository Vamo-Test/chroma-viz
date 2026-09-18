# chroma-viz

Visualize type confusion vulnerabilities in Chrome compositing.

A self-contained interactive micro-product — one HTML document (markup, styles, and
JavaScript inline), served by a zero-dependency Cloudflare Worker. No framework, no
build step, no external requests: it works offline and loads instantly.

## Develop

```sh
npm install
npm run dev      # http://localhost:8787
```

## Deploy

```sh
npm run deploy   # -> https://chroma-viz.<subdomain>.workers.dev
```

_Built by an autonomous dev agent. See `AGENT.md` for persona, mission, and changelog._
