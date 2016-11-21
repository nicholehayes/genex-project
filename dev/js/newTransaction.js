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

function fixDate(arg){
	return (arg.substring(5,7)+arg.substring(8,10)+arg.substring(0,4));
}

function getTransactions() {
    var buid = $('#bull').val();
	$.get("http://continentalgenetics.ddns.net:8080/storage/all_units", { bull_uid : buid }, function( data ) {
        console.log(data);
        $("#tableData")[0].innerHTML = "";
        data.forEach(function(data) {
            var collectionID = data.breed_abbreviation+pad(data.bull_id,5)+fixDate(data.date);
            var tankloc = data['tank_number'];
            var pieloc = data['pie'];
            var boxloc = data['box'];
            var boxUnits = data['units'];

            var row = "<tr><td><input name=\"collection_selected\" type=\"radio\" value=\'" + JSON.stringify(data) + "\'/></td><td class=\"mdl-data-table__cell--non-numeric\">"+collectionID+"</td> <td>"+tankloc+"</td> <td>"+pieloc+"</td> <td>"+boxloc+"</td> <td>"+boxUnits+"</td> </tr>";
            $("#tableData")[0].innerHTML += row;
        });
	});
}

//NOTE: $('input[name=collection_selected]:checked', '#tableData').val()

/*
    -Add text with number of units remaining for selected collection
        -Subtract the current number of units in the transaction form
    -Add JS to enact the transactions
    -If the storage combination doesn't exist yet, create it

*/

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

function getUnitsToBeStored(){
	var collection = $('#collection').find(':selected').val();
	var param = {collection_id:collection};
	var units = 0;
	$.ajax({
		url: "http://continentalgenetics.ddns.net:8080/collection/get",
		data: param,
		type: 'GET',
		async: false,
		success: function(data){
			units = parseInt(data[0].units);
			$.ajax({
				url: "http://continentalgenetics.ddns.net:8080/storage/get",
				data: param,
				type: 'GET',
				async: false,
				success: function(data){
					for(var x in data){
						units-=parseInt(data[x].units);
					}
				}
			});
		}
	});
	console.log(units);
	$('#unitsstored').val(units).parent().addClass('is-focused');
}

function changeTank(){
	$('#tanknum').val($('#tank').find(':selected').val()).parent().addClass('is-focused');
	var tank = $('#tank').find(':selected').val();
	if (tank!= null || tank != '') {
		$.get("http://continentalgenetics.ddns.net:8080/location/unit_count", {tank_number: tank}, function (data) {
			var dat = (data)
			var test = "";
			$('.box-card').removeClass('box-green');
			$('.box-card').removeClass('box-yellow');
			$('.box-card').removeClass('box-orange');
			$('.box-card').removeClass('box-red');

			for (var x in dat) {
				var pie = dat[x].pie;
				var box = dat[x].box;
				var id = pie + box;
				$("#" + id).text(dat[x].total_units);
				
				if($("#" + id).text() < 100){

					$('#'+ id).addClass('box-green');
				}
				else if($("#" + id).text() < 200){

					$("#" + id).addClass('box-yellow');
				}
				else if($("#" + id).text() < 300){

					$('#'+ id).addClass('box-orange');
				}
				else{

					$('#'+ id).addClass('box-red');
				}
			}
		});
	}
	componentHandler.upgradeDom();
	//return getColor();

}

$(document).ready(function(){
	getBulls();
    getTank();
});