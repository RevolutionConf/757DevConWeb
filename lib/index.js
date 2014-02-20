/*jslint node: true*/
/*jslint nomen: true*/

var config = require('./config'),
    express = require("express"),
    app = express(),
    routes = require('./routes');

module.exports = (function () {
    "use strict";
    routes(app, config);

    function startServer() {
        app.listen(config.port);
        console.log("Listening on port: " + config.port);
    }

    return {
        start: startServer
    };
}());