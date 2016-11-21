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

var collectionID;
var tankloc;
var pieloc;
var boxloc;
var boxUnits;

var tabledata = '';

tabledata += "   <tr><td class=\"mdl-data-table__cell--non-numeric\">"+collectionID+"</td><td>"+tankloc+"</td> <td>"+pieloc+"</td> <td>"+boxloc+"</td> <td>"+boxUnits+"</td> </tr>";


$("#tableData").append(tabledata);
