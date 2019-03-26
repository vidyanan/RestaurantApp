const myform = document.querySelector('#profileForm');
myform.addEventListener('submit', beginClosing);

// var x = document.getElementById("myRadio");
// var v = document.getElementById("myRadio1");
// console.log(x.checked);
// console.log(v.checked);
// console.log(window.location.href.split("?"))

fillInData(window.location.href.split("?")[1])

function fillInData(i){
  myform.children[0].value = i;
  //get data on user i from database
}

function beginClosing(e){
  if (e.target.classList.contains('btn modify')) {
    //Push changes to server
  }
  window.close();
}
