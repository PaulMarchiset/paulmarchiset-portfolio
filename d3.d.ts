// Minimal module shim for D3 to satisfy TypeScript in Nuxt builds.
// Prefer installing `@types/d3` for full typing.
declare module 'd3' {
  const d3: any
  export = d3
}
