/*jslint node: true*/
/*jslint nomen: true*/
var path = require("path"),
    express = require("express"),
    mcapi = require("mailchimp-api");

function subscribeEmailAddress(emailAddress, config, response) {
    "use strict";

    var onSubscribeSuccess = function (data) {
        response.redirect("/?thanks");
        console.log("success");
        console.log(data);
    },
        onSubscribeFailure = function (error) {
            response.redirect("/?error=" + error.name);
            console.log("error");
            console.log(error);
        },
        mc = new mcapi.Mailchimp(config.mailchimp.apiKey),
        subscribeOptions = {
            id: config.mailchimp.listId,
            email: {
                email: emailAddress
            }
        };

    mc.lists.subscribe(subscribeOptions, onSubscribeSuccess, onSubscribeFailure);
}

module.exports = function (app, config) {
    "use strict";

    app.use(express.bodyParser());
    app.use(express.compress());

    // set up /submit route
    app.post("/submit", function (req, res, next) {
        console.log("submit request!");
        console.log(req.body.emailAddress);
        subscribeEmailAddress(req.body.emailAddress, config, res);
    });
    
    app.get("/is/this/the/real/life", function (req, res){
       res.send(process.env); 
    });

    var publicFolder = path.normalize(__dirname + "/../../dist"),
        oneDay = 86400000;

    console.log("Public folder located at: " + publicFolder);
    app.use(express.static(publicFolder, {
        maxAge: oneDay * 7
    }));
};