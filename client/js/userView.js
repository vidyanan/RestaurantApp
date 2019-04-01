const close = document.querySelector("#closeWindow");
close.addEventListener('click', closeWindow);

async function getUserDetails(userId) {
  return $.get('/profile/' + userId);
}

async function fillInData(){
  let userId = 0;
  await getUserDetails(userId).then((dictionary) => {
      $("#id").text(userId);
      $("#firstName").text(dictionary['firstName']);
      $("#lastName").text(dictionary['lastName']);
      $("#address").text(dictionary['address']);
      $("#email").text(dictionary['email']);
      $("#phone").text(dictionary['phonenumber']);
      $("#birthday").text(dictionary['birthday']);
  });
}

function closeWindow() {
    window.close();
}

window.onload=fillInData;
