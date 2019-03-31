const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', submitLoginForm);

function submitLoginForm(e) {
	e.preventDefault();

	const username = loginForm.username.value;
	const password = loginForm.password.value;

	// add backend login to encrtpt password save and verify type of account
	if (username=="admin" && password=="admin"){
		window.location.href = '/adminPage.html';
	} else if (username=="user" && password=="user"){
		window.location.href = '/restaurant.html';
	} else if (username=="user2" && password=="user2"){
		window.location.href = '/restaurantOwner.html';
	} else {
		alert("error: invalid username and password")
	}

}