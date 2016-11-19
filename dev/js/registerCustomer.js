function registerCustomer(){
	var form = $('#registercustomerform')[0]; // You need to use standart javascript object here
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