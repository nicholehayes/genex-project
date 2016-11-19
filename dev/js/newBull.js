/**
 * Created by Amy on 11/19/2016.
 */

/**
var uploadbutton = document.getElementById("uploadBtn");

uploadbutton.onclick = function () {
	this.value = null;

}
uploadbutton.onchange = function () {
	document.getElementById("uploadFile").placeholder = this.value;
	alert(this.value);
};
**/


document.getElementById("uploadBtn").onchange = function () {
	document.getElementById("uploadFile").value = this.files[0].name;
};



function newBull(){
    var form = $('#newbullform')[0]; // You need to use standart javascript object here
    var formData = new FormData(form);
    $.ajax({
        url: './php/createcustomer.php',
        data: formData,
        type: 'POST',
        // THIS MUST BE DONE FOR FILE UPLOADING
        contentType: false,
        processData: false,
        success:function(data){
            if(data.substr(0,1) === "1"){
                alert("success");
            }
            else{
                alert(data);
            }
        }
    });
}

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

function getOwner(){
	var params = {first_name : "", last_name:""};
	$.get("http://continentalgenetics.ddns.net:8080/get_customer", function( data ) {
		var dat = JSON.parse(data)
		var test ="";
		for (var x in dat){
		test+="<option value='"+dat[x].customer_id+"'>"+dat[x].last_name+", "+dat[x].first_name+"</option>";
		}
		$('#owner').html(test);
	});
}
