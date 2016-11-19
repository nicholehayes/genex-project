/**
 * Created by Amy on 11/19/2016.
 */
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

function checkFields(){
	var check = true;
	var fields = {$.('#breed').val(),
					  $.('#name').val(),
					  $.('#regnum').val(),
					  $.('input[name="options"]:checked').val(),
					  $.('#dob').val(),
					  $.('#image').val()};
   for( var x in fields){
		if (!isNullBlank(x))
			check = false;
	}			  
	return check;
}

function isNullBlank(arg){
	if (arg!= null && arg!="")
		return true;
	return false;
}

function getBreeds(){
	$.ajax({
		url: './php/createcustomer.php',
		data: formData,
		type: 'POST',
		// THIS MUST BE DONE FOR FILE UPLOADING
		contentType: false,
		processData: false,
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
	for(var i = 0; i < breeds.length-1, i++){
		var breed = breeds[i];
		var breed_abbreviation =  breeds[++i];
		options+= "<option value='"+breed_abbreviation+"'>"+breed+"</option>\n";
	}
	$('#breed').append(options);
}