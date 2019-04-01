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
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "/profile/",
	  "method": "GET",
	  "headers": {
	  }
	}
	$.ajax(settings).done(function (response) {
		return response;
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
	var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/profile?="+id,
  "method": "DELETE",
  "headers": {
  }
}

	$.ajax(settings).done(function (response) {
  	return response
	});
}

//restaurant

function newRestaurant(hours, name, featuredImage, url, location, cuisine, cuisineImage) {
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/restaurant/?name="+name+"&featuredImage="+featuredImage+"&url="+url+"&location="+location+"&cuisine="+cuisine+"&cuisineImage="+cuisineImage+"&hours="+hours.toString(),
  "method": "POST",
  "headers": {
  }
}

  $.ajax(settings).done(function (response) {
    return response;
  });
}

function RestaurantByID(id) {
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/restaurant/"+id,
  "method": "GET",
  "headers": {
    "cache-control": "no-cache",
    "Postman-Token": "70ac668f-c821-4664-8370-81d724e9e932"
  }
}

$.ajax(settings).done(function (response) {
  return response;
});
}

function getRestaurants() {
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/restaurant",
  "method": "GET",
  "headers": {
    "cache-control": "no-cache",
    "Postman-Token": "72703c9f-60d9-494d-a208-254d01e35361"
  }
}

$.ajax(settings).done(function (response) {
  return response;
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
  return response;
});
}

///review

function getReviews() {
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/review",
  "method": "GET",
  "headers": {
  }
}

$.ajax(settings).done(function (response) {
  return response
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
