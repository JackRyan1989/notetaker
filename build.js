require("esbuild").buildSync({
  entryPoints: [
    "./src/app.js",
    "./src/sw.js",
    "./src/components/baseComp.js",
    "./src/components/button.js",
    "./src/dataStore/dataStore.js",
    "./src/templates/mainContentBox.js",
    "./src/templates/newButton.js",
    "./src/templates/saveButton.js",
    "./src/templates/titleBox.js",
  ],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ["chrome60", "firefox60", "safari13", "edge20"],
  outdir: "./dist",
});
