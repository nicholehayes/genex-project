/**
 * Created by kyle on 11/20/16.
 */

$("#discardDiv").hide();
$("#shipDiv").hide();
$("#moveDiv").hide();

$("#discard").click(function () {
    $("#discardDiv").show();
    $("#shipDiv").hide();
    $("#moveDiv").hide();


});
$("#ship").click(function () {
    $("#discardDiv").hide();
    $("#shipDiv").show();
    $("#moveDiv").hide();


});

$("#move").click(function () {
    $("#discardDiv").hide();
    $("#shipDiv").hide();
    $("#moveDiv").show();


});