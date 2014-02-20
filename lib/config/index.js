/*jslint node: true*/
module.exports = (function () {
    "use strict";

    var configuration = {};
    configuration.port = process.env.port || 1337;
    configuration.mailchimp = {
        apiKey: "72441e170f542334a228f1625f4e5369-us1",
        listId: "caaf9cfb52"
    };

    return configuration;
}());