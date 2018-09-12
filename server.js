// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('views'));
app.use(express.static('node_modules/three/build'));
app.use(express.static('node_modules/three/examples/js/renderers'));

// listen for requests :)
var listener = app.listen(8080 || process.env.PORT, function () {
  console.log('Your app is listening on port ' + 8080 || listener.address().port);
});
