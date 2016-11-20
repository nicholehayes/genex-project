function getBreeds(){
	var params = {breed: "", abbr: ""};
	$.get("http://continentalgenetics.ddns.net:8080/get_breed", params, function( data ) {
		var dat = JSON.parse(data)
		var test ="";
		for (var x in dat){
		test+="<option value='"+dat[x].breed_abbreviation+"'>"+dat[x].breed+"</option>";
		}
		$('#breed').html(test);
	});
}

$(document).ready(function(){
	getBreeds();
});

function getStud(){

	var params = {pie: '01', box: '01'};
	$.get("http://continentalgenetics.ddns.net:8080/stud/get",params, function( data ) {
		var dat = (data)
		var test ="<option value=''>Choose Stud</option>";
		for (var x in dat){
			test+="<option value='"+dat[x].stud_code+"'>"+dat[x].stud_code+"</option>";
		}
		$('#tank').html(test);
	});
}test+="<option value='"+dat[x].collection_id+"'>"+dat[x].breed_abbreviation+pad(dat[x].bull_id,5)+fixDate(dat[x].date)+"</option>";