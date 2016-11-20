function getStorage(){
	$.get("http://continentalgenetics.ddns.net:8080/collection/get", function( data ) {
		var dat = JSON.parse(data)
		var test ="<option value=''>Choose Bull</option>";
		for (var x in dat){
			test+="<option value='"+dat[x].breed_abbreviation+pad(dat[x].bull_id,5)+fixDate(dat[x].date)+"'>"+dat[x].breed_abbreviation+pad(dat[x].bull_id,5)+fixDate(dat[x].date)+"</option>";
		}
		$('#collection').html(test);
	});
}

function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

function fixDate(arg){
	return (arg.substring(5,7)+arg.substring(8,10)+arg.substring(0,4));
}

$(document).ready(function(){
	getStorage();
});