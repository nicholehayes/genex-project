/**
 * Created by kyle on 11/19/16.
 */


//var boxNum = 120;

var pie1 = 30;

var pie2 = 30;

var pie3 = 30;

var pie4 = 30;

for(var i = 1; i <= pie1; i++)
{
    var boxtext = "";

    boxtext += "   <div id=\""+ pad(1) +""+ pad(i)+"\"  data-"+pad(1)+""+pad(i)+"=\""+pad(1)+""+pad(i)+"\" class=\"box-card\"></div>  ";

    $('#addBoxes').append(boxtext);




}

for(var i = 1; i <= pie2; i++)
{
    var boxtext = "";

    boxtext += "   <div id=\""+ pad(2) +""+ pad(i)+"\"  data-"+pad(2)+""+pad(i)+"=\""+pad(2)+""+pad(i)+"\" class=\"box-card\"></div>  ";
    $('#addBoxes').append(boxtext);
}

for(var i = 1; i <= pie3; i++)
{
    var boxtext = "";

    boxtext += "   <div id=\""+ pad(3) +""+ pad(i)+"\"  data-"+pad(3)+""+pad(i)+"=\""+pad(3)+""+pad(i)+"\" class=\"box-card\"></div>  ";

    $('#addBoxes').append(boxtext);
}

for(var i = 1; i <= pie4; i++)
{
    var boxtext = "";

    boxtext += "   <div id=\""+ pad(4) +""+ pad(i)+"\"  data-"+pad(4)+""+pad(i)+"=\""+pad(4)+""+pad(i)+"\" class=\"box-card\"></div>  ";

    $('#addBoxes').append(boxtext);
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}


$(".box-card").click( function () {


   // alert(this.id);

     var pos = this.id;

     var test = $('#' + pos).data(pos);
     pie = test[0] + test[1];
     box = test[2] + test[3];

     $("#pienum").val(pie).parent().addClass('is-focused');
     $("#boxnum").val(box).parent().addClass('is-focused');

    componentHandler.upgradeDom();


});
