const myform = document.querySelector('#profileForm');
myform.addEventListener('submit', beginClosing);


function beginClosing(e){
  if (e.target.classList.contains('btn modify')) {
    newRestaurant(myform.children[17].value, myform.children[1].value, myform.children[2].value,myform.children[5].value,myform.children[8].value, myform.children[11].value],myform.children[14].value)
  }
  window.close();
}
