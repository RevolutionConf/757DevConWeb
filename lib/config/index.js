/*jslint node: true*/
"use strict";

module.exports = (function () {
    var configuration = {
        port: process.env.port || 1337,
        mailchimp: {
            apiKey: "72441e170f542334a228f1625f4e5369-us1",
            listId: "caaf9cfb52"
        }
    };

    return configuration;
}());