/*jslint node: true*/
"use strict";

module.exports = (function () {
    var configuration = {
        port: process.env.port || 1337,
        mailchimp: {
            apiKey: process.env.MAILCHIMP_API_KEY,
            listId: process.env.MAILCHIMP_LIST_ID
        }
    };

    return configuration;
}());