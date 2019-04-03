function newProfile(firstname, lastname, address, email, password, phonenumber, birthday, type="user") {
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "/profile/?firstname=+"+firstname+"+&lastname="+lastname+"&address="+address+"&email="+email+"&password="+password+"&phonenumber="+phonenumber+"&birthday="+birthday+"",
	  "method": "POST",
	  "headers": {
	  }
	}

	$.ajax(settings).done(function (response) {
	  return response;
	});
}


function login(email, password) {
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "/login?email="+email+"&password="+password,
	  "method": "GET",
	  "headers": {
	  }
	}

	$.ajax(settings).done(function (response) {
		console.log(response);
		console.log(typeOf(response));
		return response;
	});
}
