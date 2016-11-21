function getBulls(){
	$.get("http://continentalgenetics.ddns.net:8080/bull/get", function( data ) {
		var dat = data;
		var test ="<option value=''>Choose Bull</option>";
		for (var x in dat){
			test+="<option value='"+dat[x].bull_uid+"'>"+dat[x].breed_abbreviation+pad(dat[x].bull_id,5)+" - "+dat[x].name+"</option>";
		}
		$('#bull').html(test);
	});
}

function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

function getStud(){
	var params = {order_by: 'name', order_dir:'ASC'}
	$.get("http://continentalgenetics.ddns.net:8080/stud/get",params, function( data ) {
		var dat = (data)
		var test ="<option value=''>Choose Stud</option>";
		for (var x in dat){
			test+="<option value='"+dat[x].stud_code+"'>"+pad(dat[x].stud_code,4)+'-'+dat[x].name+"</option>";
		}
		$('#studcode').html(test);
	});
}

function addCollection(){
	var bull = $('#bull').find(':selected').val();
	var stud = $('#studcode').find(':selected').val();
	var date = $('#date').val();
	var volume = $('#volume').val();
	var motility = $('#motility').val();
	var units = $('#units').val();
	var notes = $('#notes').val();
	var data = {
		bull
	}
}
$(document).ready(function(){
	getBulls();
	getStud();
});