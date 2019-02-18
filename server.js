const express = require("express");
const path = require("path");
const compression = require('compression');
const expressStaticGzip = require("express-static-gzip");
const app = express();
const PUBLIC_PATH = path.resolve(__dirname, 'build');

app.use(compression());
app.use("/", (req, res, next) => {
   // res.set('Cache-Control', 'public, max-age=86400'); // 24 hour
    next();
  }, 
  expressStaticGzip(PUBLIC_PATH)
);

app.use('/static/js/', express.static('build/static/js/'))

app.get('/', function (req, res) {
  console.log('Req received');
  res.set('X-Frame-Options', 'DENY');
  res.set('Strict-Transport-Security', 'max-age=<12960000>; includeSubDomains');
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('Cache-Control', 'public, max-age=86400'); // 24 hour
  res.sendFile(path.resolve(PUBLIC_PATH, 'index.html'));
});

console.log('app is startingg');
app.listen(3000);