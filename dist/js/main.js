!function(console, document, location, $) {
    "use strict";
    $("[data-toggle='tooltip']").tooltip();
    var reason, reasonDescription, thanksBar = $("#thanksBar"), registerBar = $("#registerBar"), areaNames = [ "Norfolk", "Virginia Beach", "Hampton Roads", "Chesapeake", "Newport News", "Coastal Virginia", "Portsmouth", "Suffolk", "Hampton", "757", "Tidewater" ], currentArea = 0;
    setInterval(function() {
        var areaBox = $("#themtoo"), randomArea = areaNames[currentArea];
        currentArea += 1, currentArea > areaNames.length - 1 && (currentArea = 0), areaBox.fadeOut(function() {
            areaBox.text(randomArea), areaBox.fadeIn();
        });
    }, 2e3), thanksBar.hide().removeClass("hide"), registerBar.hide().removeClass("hide"), 
    "?thanks" === location.search.toLowerCase() ? (thanksBar.show(), registerBar.hide()) : (thanksBar.hide(), 
    registerBar.show()), location.search.toLowerCase().indexOf("?error") >= 0 && (reason = location.search.toLowerCase().split("=")[1], 
    reasonDescription = "A wicked error occured.", reason.toLowerCase() === "List_AlreadySubscribed".toLowerCase() && (reasonDescription = "No need to fear!  You're already on the list.  We'll keep you posted."), 
    reason.toLowerCase() === "ValidationError".toLowerCase() && (reasonDescription = "We need an email address, not a random collection of characters.  Try again."), 
    $("#registerEmailAddress").popover({
        title: "Whoa.",
        content: reasonDescription,
        trigger: "manual",
        placement: "top"
    }).popover("toggle")), $("#registerEmailAddress").focus();
}(console, document, location, $);