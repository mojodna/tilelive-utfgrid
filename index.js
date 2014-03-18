"use strict";

var url = require("url");

var PREFIX = "utfgrid+";

module.exports = function(tilelive, options) {
  var UTFGrid = function(uri, callback) {
    uri = url.parse(uri, true);

    uri.protocol = uri.protocol.replace(PREFIX, "");

    return tilelive.load(uri, function(err, source) {
      if (err) {
        return callback(err);
      }

      // proxy source methods
      this.getTile = source.getGrid.bind(source);
      this.getInfo = source.getInfo.bind(source);
      this.close = source.close.bind(source);

      return callback(null, this);
    }.bind(this));
  };

  UTFGrid.registerProtocols = function(tilelive) {
    // TODO iterate over previously registered protocols and prepend this?
    tilelive.protocols[PREFIX + "mbtiles:"] = this;
    tilelive.protocols[PREFIX + "tmstyle:"] = this;
  };

  UTFGrid.registerProtocols(tilelive);

  return UTFGrid;
};