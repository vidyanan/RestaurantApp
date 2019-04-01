const myform = document.querySelector('#profileForm');
myform.addEventListener('submit', beginClosing);

// var x = document.getElementById("myRadio");
// var v = document.getElementById("myRadio1");
// console.log(x.checked);
// console.log(v.checked);
// console.log(window.location.href.split("?"))

const reponse = JSON.parse(RestaurantByID(window.location.href.split("?")[1]));
fillInData(window.location.href.split("?")[1])

function fillInData(i){
  myform.children[0].value = i;
  myform.children[1].value = reponse["name"];
  myform.children[2].value = reponse["featuredImage"];
  myform.children[5].value = reponse["url"];
  myform.children[8].value = reponse["location"];
  myform.children[11].value = reponse["cuisine"];
  myform.children[14].value = reponse["cuisineImage"];
  myform.children[17].value = reponse["hours"];
}

function beginClosing(e){
  if (e.target.classList.contains('btn modify')) {
    deleteRest(myform.children[0].value)
    newRestaurant(reponse["hours"], reponse["name"], reponse["featuredImage"],reponse["url"],reponse["location"], reponse["cuisine"],reponse["cuisineImage"])
  }
  window.close();
}
