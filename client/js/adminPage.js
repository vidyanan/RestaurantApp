

const userTable = document.getElementById('table table-user')
const restTable = document.getElementById('table table-rest')
const reviewTable = document.getElementById('table table-review')
const searchUserBar = document.getElementById('searchUser')
const searchRestBar = document.getElementById('searchRest')
const searchReviewBar = document.getElementById('searchReview')

userTable.addEventListener('click', openUserEdit);
restTable.addEventListener('click', openRestEdit);
reviewTable.addEventListener('click', reviewDelete);
searchUserBar.addEventListener('click', searchUser);
searchRestBar.addEventListener('click', searchRest);
searchReviewBar.addEventListener('click', searchReview);


function openUserEdit(e) {
    e.preventDefault();
    var f = parseInt(e.target.parentElement.parentElement.children[0].textContent);
    if (e.target.classList.contains('btn-success')) {
      var l = "/userEdit.html?"
      var final = l.concat(f)
      window.open(final, "edit", "scrollbars=1,height=1050px,width=375px");
    }

}

function openRestEdit(e) {
    e.preventDefault();
    var f = parseInt(e.target.parentElement.parentElement.children[0].textContent);
    if (e.target.classList.contains('btn-success')) {
      var l = "/restEdit.html?"
      var final = l.concat(f)
      window.open(final, "edit", "scrollbars=1,height=1050px,width=375px");
    }

}

function reviewDelete(e) {
    e.preventDefault();
    var f = parseInt(e.target.parentElement.parentElement.children[0].textContent);

    //Call server to delete review with review ID f

    if (e.target.classList.contains('btn-success')) {
      var k = 0;
      while(k<e.target.parentElement.parentElement.parentElement.children.length){
        if ( f == parseInt(e.target.parentElement.parentElement.parentElement.children[k].children[0].textContent)){
          break;
        }
        k = k + 1;
      }
      e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement.parentElement.children[k]);
    }

}

function searchUser(e){

  if (e.target.classList.contains('btn-searchUser')) {
    var k = 0;
    while(k<e.target.parentElement.nextSibling.children[1].children.length){
      e.target.parentElement.nextSibling.children[1].children[k].setAttribute("style","")
      k = k + 1;
    }

    var search = (e.target.parentElement.children[0].value);
    search.trim()
    var k = 0;
    while(k<e.target.parentElement.nextSibling.children[1].children.length){
      if(!((e.target.parentElement.nextSibling.children[1].children[k].children[1].textContent).trim().toLowerCase()).includes(search.toLowerCase())){
        e.target.parentElement.nextSibling.children[1].children[k].setAttribute("style","display:none")
      }
      k = k + 1;
    }
  }
}

function searchRest(e){

  if (e.target.classList.contains('btn-searchRest')) {

    var k = 0;
    while(k<e.target.parentElement.nextSibling.children[1].children.length){
      e.target.parentElement.nextSibling.children[1].children[k].setAttribute("style","")
      k = k + 1;
    }

    var search = (e.target.parentElement.children[0].value);
    search.trim()
    var k = 0;
    while(k<e.target.parentElement.nextSibling.children[1].children.length){
      if(!((e.target.parentElement.nextSibling.children[1].children[k].children[1].textContent).trim().toLowerCase()).includes(search.toLowerCase())){
        e.target.parentElement.nextSibling.children[1].children[k].setAttribute("style","display:none")
      }
      k = k + 1;
    }
  }
}

function searchReview(e){

  if (e.target.classList.contains('btn-searchReview')) {
    var k = 0;
    while(k<e.target.parentElement.nextSibling.children[1].children.length){
      e.target.parentElement.nextSibling.children[1].children[k].setAttribute("style","")
      k = k + 1;
    }

    var search = (e.target.parentElement.children[0].value);
    search.trim()
    var k = 0;
    while(k<e.target.parentElement.nextSibling.children[1].children.length){
      if(!((e.target.parentElement.nextSibling.children[1].children[k].children[1].textContent).trim().toLowerCase()).includes(search.toLowerCase())){
        e.target.parentElement.nextSibling.children[1].children[k].setAttribute("style","display:none")
      }
      k = k + 1;
    }
  }
}
