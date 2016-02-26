"use strict";

var MBTiles = require("mbtiles"),
    tilelive = require("tilelive");

var UTFGrid = require("../")(tilelive);

MBTiles.registerProtocols(tilelive);
UTFGrid.registerProtocols(tilelive);

// Paths that work on Windows
// c:/dev/web/tilelive-utfgrid/test/fixtures/plain_2.mbtiles
// c/dev/web/tilelive-utfgrid/test/fixtures/plain_2.mbtiles
// /dev/web/tilelive-utfgrid/test/fixtures/plain_2.mbtiles
// process.cwd() + "/test/fixtures/plain_2.mbtiles
// __dirname + "/../test/fixtures/plain_2.mbtiles
//
// Doesn't work (SQLITE_CANTOPEN: unable to open database file)
// ../test/fixtures/plain_2.mbtiles (original)
// c:\dev\web\tilelive-utfgrid\test\fixtures\plain_2.mbtiles
// test/fixtures/plain_2.mbtiles

tilelive.load("utfgrid+mbtiles://" + __dirname + "/../test/fixtures/plain_2.mbtiles", function(err, source) {
  if (err) {
    console.error(err.stack);
    process.exit(1);
  }

  return source.getTile(0, 0, 0, function(err, data, headers) {
    if (err) {
      console.error(err.stack);
      process.exit(1);
    }

    console.log("Headers:", headers);
    console.log("UTFGrid:", data);
  });
});
