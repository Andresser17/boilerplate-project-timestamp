// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  const date = req.params.date;

  const time = Number(date)
    ? new Date(Number(date))
    : date === undefined 
    ? new Date()
    : new Date(date);

  if (String(time) !== "Invalid Date") {
    res.json({ unix: time.getTime(), utc: time.toGMTString() });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
const port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
