require("esbuild").buildSync({
  entryPoints: [
    "./src/app.js",
    "./src/sw.js",
    "./src/index.css"
  ],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ["chrome89", "firefox89", "safari15", "edge89"],
  outdir: "./dist",
});
