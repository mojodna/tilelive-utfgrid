"use strict";

var tilelive = require("tilelive");

require("../")(tilelive).registerProtocols(tilelive);
require('tilelive-vector'  ).registerProtocols(tilelive);               // to create vector tiles
require('tilelive-bridge'  ).registerProtocols(tilelive);               // to bridge/connect to a geojson file 
require('tilelive-tmsource')(tilelive).registerProtocols(tilelive);     // to open the geojson file in a tm2 project
require('tilelive-tmstyle' )(tilelive).registerProtocols(tilelive);     // to open a Mapbox Studio Classic tmp2 project

// Paths that work on Windows 
// NB Only if your install directory is /dev/web/tilelive-utfgrid, as all paths are hardcoded, 
// i.e. also the road.tm2/project.yml and road.tm2/road.tm2source/data.yml!
// "utfgrid+tmstyle:///dev/web/tilelive-utfgrid/test/fixtures/road.tm2" 
// 
// Doesn't work 
// "utfgrid+tmstyle://" + __dirname + "/../test/fixtures/road.tm2" (Error: ENOENT: no such file or directory, open 'c:\dev\web\tilelive-utfgrid\c\dev\web\tilelive-utfgrid\test\fixtures\road.tm2\project.yml')
// "utfgrid+tmstyle://c:\dev\web\tilelive-utfgrid\test\fixtures\road.tm2" (Error: ENOENT: no such file or directory, open 'c:\dev\web\tilelive-utfgrid\c\:devweb	ilelive-utfgrid	estixturesoad.tm2\project.yml')
// "utfgrid+tmstyle://c/dev/web/tilelive-utfgrid/test/fixtures/road.tm2" (Error: ENOENT: no such file or directory, open 'c:\dev\web\tilelive-utfgrid\c\dev\web\tilelive-utfgrid\test\fixtures\road.tm2\project.yml')
// "utfgrid+tmstyle:///c/dev/web/tilelive-utfgrid/test/fixtures/road.tm2" (Error: ENOENT: no such file or directory, open 'c:\c\dev\web\tilelive-utfgrid\test\fixtures\road.tm2\project.yml')

tilelive.load("utfgrid+tmstyle:///dev/web/tilelive-utfgrid/test/fixtures/road.tm2", function(err, source) {
  if (err) {
    console.error(err.stack);
    process.exit(1);
  }

  return source.getTile(14, 8415, 5382, function(err, data, headers) {
    if (err) {
      console.error(err.stack);
      process.exit(1);
    }

    console.log("Headers:", headers);
    console.log("UTFGrid:", data);
    process.exit(0);
  });
});
