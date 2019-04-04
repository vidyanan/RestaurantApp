const myform = document.querySelector('#profileForm');
myform.addEventListener('submit', beginClosing);

// var x = document.getElementById("myRadio");
// var v = document.getElementById("myRadio1");
// console.log(x.checked);
// console.log(v.checked);
// console.log(window.location.href.split("?"))

window.onload = function() {
  const prmise = (RestaurantByID(window.location.href.split("?")[1]));
  prmise.then(function(responseUsers) {
    //console.log(responseUsers);
    fillInData(responseUsers)
  });

};


function fillInData(i){
  myform.children[0].value = i["_id"];
  myform.children[1].value = i["name"];
  myform.children[2].value = i["featuredImage"];
  myform.children[5].value = i["slug"];
  myform.children[8].value = i["location"];
  myform.children[11].value = i["cuisine"];
  myform.children[17].value = i["hours"];
}

function beginClosing(e){
  console.log(myform.children[0].textContent);

  if (e.target.classList.contains('btn modify')) {
    promise = deleteRest(myform.children[0].value)
    promise.then(function(responseUsers) {
      //console.log(responseUsers);
      console.log(responseUsers);
    });
    //newRestaurant(reponse["hours"], reponse["name"], reponse["featuredImage"],reponse["slug"],reponse["location"], reponse["cuisine"])
  }
  //window.close();
}
