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
});