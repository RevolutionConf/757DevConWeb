!function(console, document, location, $) {
    "use strict";
    console && !console.log && (console.log = function() {}), $("[data-toggle='tooltip']").tooltip();
    var reason, reasonDescription, thanksBar = $("#thanksBar"), registerBar = $("#registerBar");
    thanksBar.hide().removeClass("hide"), registerBar.hide().removeClass("hide"), "?thanks" === location.search.toLowerCase() ? (thanksBar.show(), 
    registerBar.hide()) : (thanksBar.hide(), registerBar.show()), location.search.toLowerCase().indexOf("?error") >= 0 && (reason = location.search.toLowerCase().split("=")[1], 
    reasonDescription = "A wicked error occured.", console.log("error reason is " + reason), 
    reason.toLowerCase() === "List_AlreadySubscribed".toLowerCase() && (reasonDescription = "No need to fear!  You're already on the list.  We'll keep you posted."), 
    reason.toLowerCase() === "ValidationError".toLowerCase() && (reasonDescription = "We need an email address, not a random collection of characters.  Try again."), 
    $("#registerEmailAddress").popover({
        title: "Whoa.",
        content: reasonDescription,
        trigger: "manual",
        placement: "top"
    }).popover("toggle")), $("#registerEmailAddress").focus();
}(console, document, location, $);