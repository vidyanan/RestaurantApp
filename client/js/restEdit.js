
const myform = document.querySelector('#profileForm');
myform.addEventListener('click', beginClosing);


fillInData(window.location.href.split("?")[1])


function fillInData(i){
  myform.children[0].value = i;
  //get restaurant info for restaruant id i
}

function beginClosing(e){
  if (e.target.classList.contains('btn modify')) {
    //Push changes to server
  }
  window.close();
}
