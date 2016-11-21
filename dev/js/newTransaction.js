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

function getTransactions() {
    var buid = $('#bull').val();
	$.get("http://continentalgenetics.ddns.net:8080/storage/get", { join_by : [{ table : 'collection', col1 : 'storage.collection_id', col2 : 'collection.collection_id'  }, 
        { table : 'location', col1 : 'storage.location_id', col2 : 'location.location_id'  }], 
        bull_uid : buid, order_by : 'date', order_dir : 'ASC' }, function( data ) {
        console.log(data);
        $("#tableData").innerHTML = "";
        data.forEach(function(data) {
            var collectionID = data['collection_id'];
            var tankloc = data['tank_number'];
            var pieloc = data['pie'];
            var boxloc = data['box'];
            var boxUnits = data['units'];

            var row = " <tr><td class=\"mdl-data-table__cell--non-numeric\"></td>"+collectionID+" <td>"+tankloc+"</td> <td>"+pieloc+"</td> <td>"+boxloc+"</td> <td>"+boxUnits+"</td> </tr>";
            $("#tableData").append(row);
        });
	});
}

$(document).ready(function(){
	getBulls();
});