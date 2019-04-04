//profile

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
	  console.log(response);
	});
}

function getProfiles(){
	return new Promise((resolve, reject) => {
		$.ajax({
			"async": true,
			"crossDomain": true,
  		"url": "/profile/",
			"method": "GET",
			"headers": {
				"cache-control": "no-cache",
			}
		})
			.done(resolve)
			.fail(reject);
	});
}

function getProfileByID(id) {
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "/profile/?="+id,
	  "method": "GET",
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
		return response;
	});
}

function deleteProfile(id) {

	return new Promise((resolve, reject) => {
		$.ajax({
			"async": true,
			"crossDomain": true,
			"url": "/profile?="+id,
			"method": "DELETE",
			"headers": {
				"Content-Type": "application/json",
			},
			"processData": false,
			"data": JSON.stringify({
				hours,
				name,
				featuredImage,
				slug,
				location,
				cuisine
			})
		})
			.done(resolve)
			.fail(reject);
	});
}

//restaurant

function newRestaurant(hours, name, featuredImage, slug, location, cuisine,restaurantOwner) {

	return new Promise((resolve, reject) => {
		$.ajax({
			"async": true,
			"crossDomain": true,
			"url": "/restaurant?restaurantOwner="+restaurantOwner,
			"method": "POST",
			"headers": {
				"Content-Type": "application/json",
			},
			"processData": false,
			"data": JSON.stringify({
				hours,
				name,
				featuredImage,
				slug,
				location,
				cuisine
			})
		})
			.done(resolve)
			.fail(reject);
	});

}

function RestaurantByID(id) {

return new Promise((resolve, reject) => {
	console.log("imann");
	$.ajax({
		"async": true,
		"crossDomain": true,
		"url": "/restaurant/"+id,
		"method": "GET",
		"headers": {
			"cache-control": "no-cache",
		}
	})
		.done(resolve)
		.fail(reject);
});


}

function getRestaurants() {

	return new Promise((resolve, reject) => {
		console.log("imann");
		$.ajax({
			"async": true,
			"crossDomain": true,
			"url": "/restaurant",
			"method": "GET",
			"headers": {
				"cache-control": "no-cache",
			}
		})
			.done(resolve)
			.fail(reject);
	});

}

function deleteRest(id) {
	var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/restaurant/?="+id,
  "method": "DELETE",
  "headers": {

  }
}

$.ajax(settings).done(function (response) {
	console.log("umm y no delete")
	console.log(reponse);
  return response;
});
}

///review

function getReviews() {
	return new Promise((resolve, reject) => {
		console.log("imann");
		$.ajax({
			"async": true,
			"crossDomain": true,
			"url": "/review",
			"method": "GET",
			"headers": {
				"cache-control": "no-cache",
			}
		})
			.done(resolve)
			.fail(reject);
	});

}

function deleteReview(id) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "/review?="+id,
    "method": "DELETE",
    "headers": {
      "cache-control": "no-cache",
      "Postman-Token": "de50779d-3282-4052-9f4e-faa6781b4a96"
    }
  }

  $.ajax(settings).done(function (response) {
    return response
  });
}
