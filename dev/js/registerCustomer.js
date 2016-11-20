function registerCustomer(){
	var formData = JSON.stringify($("#registercustomerform").serializeArray().reduce(function(a, x) { a[x.name] = x.value; return a; }, {}));
	$.ajax({
		type: 'PUT',
		url: 'http://continentalgenetics.ddns.net:8080/customer/add',
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