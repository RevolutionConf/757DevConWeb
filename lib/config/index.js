/*jslint node: true*/
"use strict";

module.exports = (function () {
    var configuration = {
        port: process.env.port || 1337,
        mailchimp: {
            apiKey: process.env.MAILCHIMP_API,
            listId: process.env.MAILCHIMP_LISTID
        }
    };

    return configuration;
}());