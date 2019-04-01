const myform = document.querySelector('#profileForm');
myform.addEventListener('submit', beginClosing);

var x = document.getElementById("myRadio");
var v = document.getElementById("myRadio1");
// console.log(x.checked);
// console.log(v.checked);
// console.log(window.location.href.split("?"))

const reponse = JSON.parse(getProfileByID(window.location.href.split("?")[1]));
fillInData(window.location.href.split("?")[1])

function fillInData(i){
  myform.children[0].value = i;
  myform.children[1].value = reponse["firstname"];
  myform.children[2].value = reponse["lastname"];
  myform.children[5].value = reponse["address"];
  myform.children[8].value = reponse["email"];
  myform.children[11].value = reponse["phonenumber"];
  myform.children[14].value = reponse["birthday"];
  if(response["type"] == "user"){
      x.checked = true;
  }
  v.checked = true;

}

function beginClosing(e){
  if (e.target.classList.contains('btn modify')) {
    deleteProfile(myform.children[0].value)
    newProfile(reponse["firstname"], reponse["lastname"], reponse["address"],reponse["email"],reponse["password"], reponse["phonenumber"],reponse["birthday"],reponse["type"])
  }
  window.close();
}
