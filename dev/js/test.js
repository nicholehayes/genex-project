function getBreeds(){
	$.ajax({
		url: 'http://continentalgenetics.ddns.net:8080/getbreed',
		type: 'GET',
		success:function(data){
			if(data!=""){
				$("body").text(data);
			}else{
				alert("No breed information available");
			}
		}
	});
}