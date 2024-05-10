$(document).keydown(function(event) {
    var button = event.key;
    $("h1").text(button);
})