const close = document.querySelector("#closeWindow");
close.addEventListener('click', closeWindow);

async function getUserDetails(userId) {
  return $.get('/profile/' + userId);
}

function getUserId() {
    let url = new URL(window.location);
    let params = url.searchParams;
    let id = params.get('id');

    if(id === null) {
        console.log("Id not given!");
        window.close();
    } else {
      return id;
    }
}

async function fillInData(){
  let userId = getUserId();

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
