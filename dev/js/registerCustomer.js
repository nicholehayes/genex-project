function registerCustomer(){
	var formData = JSON.stringify($("#registercustomerform").serializeArray());
	$.ajax({
		type: 'POST',
		url: 'http://continentalgenetics.ddns.net:8080/add_customer',
		data: formData,
		dataType: 'json',
		contentType:"application/json",
		success:function(data){
			if(~data.indexOf("1")){
				alert("success");
			}
			else{
				alert(data);
			}
		}
	});
}