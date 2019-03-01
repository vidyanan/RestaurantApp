
const myform = document.querySelector('#profileForm');
myform.addEventListener('click', beginClosing);

console.log(myform)
var x = document.getElementById("myRadio");
var v = document.getElementById("myRadio1");
console.log(x.checked);
console.log(v.checked);
console.log(window.location.href.split("?"))
fillInData(window.location.href.split("?")[1])
function closeForm() {
  window.close()
}

function fillInData(i){
  myform.children[4].value = i;
  //retrieve data from server about user with userID i



}

function beginClosing(e){
  if (e.target.classList.contains('btn exit')) {
    window.close;

  }
  if (e.target.classList.contains('btn cancel')) {
    window.close;
  }
  if (e.target.classList.contains('btn modify')) {

    window.close;
  }

}
