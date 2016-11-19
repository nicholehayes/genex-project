function registerCustomer(){
	$.ajax({
		url: './php/createcustomer.php',
		data: $('#registercustomerform').serialize(),
		type: 'POST',
		success:function(data){
			if(~data.indexOf("1")){
				alert("success");
				window.location.reload();
			}
			else{
				alert(data);
				window.location.reload();
			}
		}
	});
}