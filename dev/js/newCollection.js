function getBulls(){
	$.get("http://continentalgenetics.ddns.net:8080/bull/get", function( data ) {
		var dat = data;
		var test ="<option value=''>Choose Bull</option>";
		for (var x in dat){
			test+="<option value='"+dat[x].breed_abbreviation+pad(dat[x].bull_id,5)+"'>"+dat[x].breed_abbreviation+pad(dat[x].bull_id,5)+" - "+dat[x].name+"</option>";
		}
		$('#bull').html(test);
	});
}

function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}


$(document).ready(function(){
	getBulls();
});