function getStorage(){
	$.get("http://continentalgenetics.ddns.net:8080/collection/get", function( data ) {
		var dat = (data)
		var test ="<option value=''>Choose Collection</option>";
		for (var x in dat){
			test+="<option value='"+dat[x].collection_id+"'>"+dat[x].breed_abbreviation+pad(dat[x].bull_id,5)+fixDate(dat[x].date)+"</option>";
		}
		$('#collection').html(test);
	});
}

function getTank(){
	var params = {pie: '01', box: '01'};
	$.get("http://continentalgenetics.ddns.net:8080/location/get",params, function( data ) {
		var dat = (data)
		var test ="<option value=''>Choose Tank</option>";
		for (var x in dat){
			test+="<option value='"+dat[x].tank_number+"'>"+dat[x].tank_number+"</option>";
		}
		$('#tank').html(test);
	});
}

function changeTank(){
	$('#tanknum').val($('#tank').find(':selected').val()).parent().addClass('is-focused');
	componentHandler.upgradeDom();

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
	getTank();
});

function getUnitsToBeStored(){

	var collection = $('#collectionValue');
	for (var i=0; i<collection.length; i++){


	}



	$.get("http://continentalgenetics.ddns.net:8080/collection/get", function( data ) {
		var dat = (data)
		var test ="<option value=''>Choose Tank</option>";
		for (var x in dat){
			test+="<option value='"+dat[x].breed_abbreviation+pad(dat[x].bull_id,5)+fixDate(dat[x].date)+"'>"+dat[x].breed_abbreviation+pad(dat[x].bull_id,5)+fixDate(dat[x].date)+"</option>";
		}
		$('#collection').html(test);
	});

}