const close = document.querySelector("#closeWindow");
close.addEventListener('click', closeWindow);

async function getUserDetails(userId) {
  let temp = {"id": 1, "firstName": "Tim", "lastName": "Cosby", "address": "Bahen", "email": "123@uoft", "phone": 905, "birthday": 0};
  // Pull from server

  return temp;
}

async function fillInData(){
  let userId = 0;
  await getUserDetails(userId).then((dictionary) => {
      $("#id").text(dictionary['id']);
      $("#firstName").text(dictionary['firstName']);
      $("#lastName").text(dictionary['lastName']);
      $("#address").text(dictionary['address']);
      $("#email").text(dictionary['email']);
      $("#phone").text(dictionary['phone']);
      $("#birthday").text(dictionary['birthday']);
  });
}

function closeWindow() {
    window.close();
}

window.onload=fillInData;
