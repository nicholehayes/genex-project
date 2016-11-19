function getBulls(){
	$.get("http://continentalgenetics.ddns.net:8080/get_bull", function( data ) {
		var dat = JSON.parse(data)
		var test ="";
		for (var x in dat){
		test+="<option value='"+dat[x].breed_abbreviation+"'>"+dat[x].breed+"</option>";
		}
		$('#breed').html(test);
	});
}