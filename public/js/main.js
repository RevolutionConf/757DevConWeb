/*globals console, document, location, $*/
(function (console, document, location, $) {
    "use strict";
    if (console && !console.log) {
        console.log = function () {};
    }

    $("[data-toggle='tooltip']").tooltip();

    var thanksBar = $("#thanksBar"),
        registerBar = $("#registerBar"),
        reason,
        reasonDescription,
        areaNames = [
            "Norfolk",
            "Virginia Beach",
            "Hampton Roads",
            "Chesapeake",
            "Newport News",
            "Coastal Virginia",
            "Portsmouth",
            "Suffolk",
            "Hampton",
            "Tidewater"
        ],
        currentArea = 0;

    setInterval(function () {
        var areaBox = $("#themtoo"),
            randomArea = areaNames[currentArea];

        currentArea = currentArea + 1;
        if (currentArea > areaNames.length) {
            currentArea = 0;
        }

        console.log(randomArea);
        areaBox.fadeOut(function () {
            areaBox.text(randomArea);
            areaBox.fadeIn();
        });
    }, 2000);

    thanksBar.hide().removeClass("hide");
    registerBar.hide().removeClass("hide");

    if (location.search.toLowerCase() === "?thanks") {
        // show thanks bar
        thanksBar.show();
        // hide registration bar
        registerBar.hide();
    } else {
        // show thanks bar
        thanksBar.hide();
        // hide registration bar
        registerBar.show();
    }

    if (location.search.toLowerCase().indexOf('?error') >= 0) {
        reason = location.search.toLowerCase().split('=')[1];
        reasonDescription = "A wicked error occured.";

        console.log("error reason is " + reason);
        if (reason.toLowerCase() === ("List_AlreadySubscribed".toLowerCase())) {
            reasonDescription = "No need to fear!  You're already on the list.  We'll keep you posted.";
        }
        if (reason.toLowerCase() === ("ValidationError".toLowerCase())) {
            reasonDescription = "We need an email address, not a random collection of characters.  Try again.";
        }

        $("#registerEmailAddress").popover({
            title: "Whoa.",
            content: reasonDescription,
            trigger: "manual",
            placement: "top"
        }).popover("toggle");
    }
    $("#registerEmailAddress").focus();
}(console, document, location, $));