const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', submitLoginForm);

function submitLoginForm(e) {
	e.preventDefault();

	const username = loginForm.username.value;
	const password = loginForm.password.value;

	prmise = login(username, password);
	prmise.then(function(type) {
	// add backend login to encrtpt password save and verify type of account
	if (type=="admin"){
		window.location.href = '/adminPage.html';
	} else if (type=="user"){
		window.location.href = '/';
	} else if (type=="owner"){
		window.location.href = '/restaurantOwner.html';
	} else {
		alert("error: invalid username and password")
	}
	});
}
