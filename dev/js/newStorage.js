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
	var tank = $('#tank').find(':selected').val();
	if (tank!= null || tank != '') {
		$.get("http://continentalgenetics.ddns.net:8080/location/unit_count", {tank_number: tank}, function (data) {
			var dat = (data)
			var test = "";
			for (var x in dat) {
				var pie = dat[x].pie;
				var box = dat[x].box;
				var id = pie + box;
				$("#" + id).text(dat[x].total_units);
			}
		});
	}
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


function addStorage(){
	var collection = $('#collection').find(':selected').val();
	var unitsstored = parseInt($('#unitsstored').val());
	var tank = $('#tank').val();
	var pie = $('#pienum').val();
	var box = $('#boxnum').val();
	var id = pie+box;
	var numunits = parseInt($('#numunits').val());
	if (numunits > unitsstored){
		alert("You have exceeded units to be stored");
	}else{
		var locationid;
		var params = {tank_number: tank, pie: pie, box: box};
		$.ajax({
			url: "http://continentalgenetics.ddns.net:8080/location/get",
			data: params,
			type: 'GET',
			async: false,
			success: function(data){
				console.log(data);
				locationid = data[0].location_id;
				params = {
					collection_id:collection,
					units :numunits,
					trans_type: 4,
					to_location_id: locationid
				};
				console.log(params);
				if (numunits > 300){
					alert("This will exceed storage capacity.");
				}else {
					console.log((parseInt($('#' + id).text()) + parseInt(numunits)));
					if ((parseInt($('#' + id).text()) + parseInt(numunits)) <= 300) {
						$.ajax({
							url: "http://continentalgenetics.ddns.net:8080/transaction/add/insert",
							data: JSON.stringify(params),
							type: 'POST',
							contentType: 'application/json',
							async: false,
							success: function (data) {
								console.log(data);
							}
						});
					} else {
						alert("This box is full. NO more units can be stored.");
					}
				}
			}
		});
		getUnitsToBeStored();
		changeTank();
	}

}
