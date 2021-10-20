const polka = require("polka");

const { PORT=3000 } = process.env;
const serve = require('sirv');

const assets = serve('public', {
  dev:true,
  extensions: ['html', 'js']
})

polka()
.use(assets)
  .get("/", (req, res) => {
    res.end("ok");
  })
  .listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Running on localhost:3000`);
  });
