const profileForm = document.querySelector('#profileForm');

profileForm.addEventListener('submit', submitProfileForm);

function submitProfileForm(e) {
	e.preventDefault();

	const firstname = profileForm.firstname.value;
	const lastname = profileForm.lastname.value;
	const address = profileForm.address.value;
	const email = profileForm.email.value;
	const phonenumber = profileForm.phonenumber.value;
	const birthday = profileForm.birthday.value;
	const password = profileForm.password.value;
	const type = profileForm.type.value;

	newProfile(firstname, lastname, address, email, password, phonenumber, birthday, type)
	// add backend login to create account save preferences, etc.
	if (type=="regularuser"){
		window.location.href = 'restaurant.html';
	} else if (type=="restaurantowner"){
		window.location.href = 'restaurantOwner.html';
	} else {
		alert("error: account creation failed")
	}
}
