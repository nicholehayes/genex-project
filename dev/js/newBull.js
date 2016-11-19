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
	$.ajax({
		url: 'http://continentalgenetics.ddns.net:8080/ping',
		type: 'GET',
		success:function(data){
			if(data!=""){
				addBreeds(data);
			}else{
				alert("No breed information available");
			}
		}
	});
}

function addBreeds(data){
	var breeds = data.split(',');
	var options = "";
	for(var i = 0; i < breeds.length-1; i++){
		var breed = breeds[i];
		var breed_abbreviation =  breeds[++i];
		options+= "<option class='mdl-menu__item' value='"+breed_abbreviation+"'>"+breed+"</option>\n";
	}
	$('#breed').append(options);
}
