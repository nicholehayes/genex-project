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

$(document).ready(function() {
	var max_fields      = 10; //maximum input boxes allowed
	var wrapper         = $(".input_fields_wrap"); //Fields wrapper
	var add_button      = $(".add_field_button"); //Add button ID

	var x = 1; //initlal text box count
	$(add_button).click(function(e){ //on add input button click
		e.preventDefault();
		if(x < max_fields){ //max input box allowed
			x++; //text box increment
			$(wrapper).append('<div><input type="text" name="mytext[]"/><a href="#" class="remove_field">Remove</a></div>'); //add input box
		}
	});

	$(wrapper).on("click",".remove_field", function(e){ //user click on remove text
		e.preventDefault(); $(this).parent('div').remove(); x--;
	})
});


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
var i = 1;
function getOwner(){
	var params = {first_name : "", last_name:""};
	$.get("http://continentalgenetics.ddns.net:8080/get_customer", function( data ) {
		var dat = JSON.parse(data)
		var test ="<option value = ''>---</option>";
		for (var x in dat){
		test+="<option value='"+dat[x].customer_id+"'>"+dat[x].last_name+", "+dat[x].first_name+"</option>";
		}
		$('.owner').html(test);
		$('.owner').addClass('owners');
		$('.owner').attr('id','owner'+i);
		i++;
		$('.owner').removeClass('owner');

	});
}

function addOwnership(){

	var strVar="";
	strVar += "<div class=\"mdl-selectfield mdl-js-selectfield\">";
	strVar += "                            <select name=\"owner"+i+"\" class=\"mdl-selectfield__select owner\">";
	strVar += "                                <option value=\"\">Choose Customer<\/option>";
	strVar += "";
	strVar += "                            <\/select>";
	strVar += "                        <\/div>";
	strVar += "                            <div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">";
	strVar += "                                <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Percent Ownership\"id=\"percent"+i+"\" name=\"percent"+i+"\">";
	strVar += "                                <label class=\"mdl-textfield__label\" for=\"percent"+i+"\"><\/label>";
	strVar += "                            <\/div>";



	var text = document.getElementById('divtext').text;
	$("#ownership").append(strVar);
}



$(document).ready(function(){
	getBreeds();
	getOwner();
});