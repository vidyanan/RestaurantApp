

const userTable = document.getElementById('table table-user')
const restTable = document.getElementById('table table-rest')
const reviewTable = document.getElementById('table table-review')
const searchUserBar = document.getElementById('searchUser')
const searchRestBar = document.getElementById('searchRest')
const searchReviewBar = document.getElementById('searchReview')
const deleteBar = document.getElementById('deleteBar')

userTable.addEventListener('click', openUserEdit);
restTable.addEventListener('click', openRestEdit);
reviewTable.addEventListener('click', reviewDelete);
searchUserBar.addEventListener('click', searchUser);
searchRestBar.addEventListener('click', searchRest);
searchReviewBar.addEventListener('click', searchReview);
searchReviewBar.addEventListener('click', searchReview);
deleteBar.addEventListener('click', del)

fill();

function fill() {
  responseUsers = JSON.parse(getProfiles());
  reponseRestaurants = JSON.parse(getRestaurants());
  reponseReview = JSON.parse(getReviews());
  var i = 0;
  while(i<responseUsers.length){
    addUser(responseUsers[i]);
    i = i + 1;
  }

  i = 0;
  while(i<reponseRestaurants.length){
    addRest(reponseRestaurants[i]);
    i = i + 1;
  }

  i = 0;
  while(i<reponseReview.length){
    addReview(reponseReview[i]);
    i = i + 1;
  }

}

function addUser(user) {
  const rowElement = document.createElement('tr')
  type = user["type"]
  if(type == "user"){
    rowElement.className = 'table-warning'
  }else{
    rowElement.className = 'table-success'
  }
  const element1 = document.createElement('td')
  element1.textContent = user["__id"]
  rowElement.appendChild(element1)
  const element2 = document.createElement('td')
  element2.textContent = user["firstname"]
  rowElement.appendChild(element2)
  const element3 = document.createElement('td')
  element3.textContent = user["lastname"]
  rowElement.appendChild(element3)
  const element4 = document.createElement('td')
  element4.textContent = user["address"]
  rowElement.appendChild(element4)
  const element5 = document.createElement('td')
  element5.textContent = user["phonenumber"]
  rowElement.appendChild(element5)
  const element6 = document.createElement('td')
  element6.textContent = user["birthday"]
  rowElement.appendChild(element6)
  const element7 = document.createElement('td')
  element7.textContent = user["password"]
  rowElement.appendChild(element7)
  const element8 = document.createElement('td')
  element8.textContent = user["email"]
  rowElement.appendChild(element8)
  const element9 = document.createElement('td')
  element9.textContent = user["type"]
  rowElement.appendChild(element9)
  const element10 = document.createElement('td')
  const button = document.createElement('button')
  button.type = "submit";
  button.className = "btn btn-success"
  button.textContent = "Modify"
  element10.appendChild(button)
  rowElement.appendChild(element10)
  userTable.children[1].appendChild(rowElement)
}

function addRest(restaurant) {
  const rowElement = document.createElement('tr')
  rowElement.className = "table-active"
  const element1 = document.createElement('td')
  element1.textContent = restaurant["__id"]
  rowElement.appendChild(element1)
  const element2 = document.createElement('td')
  element2.textContent = restaurant["name"]
  rowElement.appendChild(element2)
  const element3 = document.createElement('td')
  element3.textContent = restaurant["featuredImage"]
  rowElement.appendChild(element3)
  const element4 = document.createElement('td')
  element4.textContent = restaurant["slug"]
  rowElement.appendChild(element4)
  const element5 = document.createElement('td')
  element5.textContent = restaurant["location"]
  rowElement.appendChild(element5)
  const element6 = document.createElement('td')
  element6.textContent = restaurant["cuisine"]
  rowElement.appendChild(element6)
  const element7 = document.createElement('td')
  element7.textContent = restaurant["hours"].toString()
  rowElement.appendChild(element7)
  const element10 = document.createElement('td')
  const button = document.createElement('button')
  button.type = "submit";
  button.className = "btn btn-success"
  button.textContent = "Modify"
  element10.appendChild(button)
  rowElement.appendChild(element10)
  restTable.children[1].appendChild(rowElement)
}

function addReview(review) {
  const rowElement = document.createElement('tr')
  rowElement.className = "table-active"
  const element1 = document.createElement('td')
  element1.textContent = review["__id"]
  rowElement.appendChild(element1)
  const element2 = document.createElement('td')
  element2.textContent = review["name"]
  rowElement.appendChild(element2)
  const element3 = document.createElement('td')
  element3.textContent = review["stars"]
  rowElement.appendChild(element3)
  const element4 = document.createElement('td')
  element4.textContent =  review["comment"]
  rowElement.appendChild(element4)
  const element5 = document.createElement('td')
  element5.textContent =  "empty"
  rowElement.appendChild(element5)
  const element6 = document.createElement('td')
  element6.textContent = review["createdAt"]
  rowElement.appendChild(element6)
  const element10 = document.createElement('td')
  const button = document.createElement('button')
  button.type = "submit";
  button.className = "btn btn-success"
  button.textContent = "Remove"
  element10.appendChild(button)
  rowElement.appendChild(element10)
  reviewTable.children[1].appendChild(rowElement)
}

function openUserEdit(e) {
    e.preventDefault();
    var f = parseInt(e.target.parentElement.parentElement.children[0].textContent);
    if (e.target.classList.contains('btn-success')) {
      var l = "userEdit.html?"
      var final = l.concat(f)
      window.open(final, "edit", "scrollbars=1,height=1050px,width=375px");
    }

}

function openRestEdit(e) {
    e.preventDefault();
    var f = parseInt(e.target.parentElement.parentElement.children[0].textContent);
    if (e.target.classList.contains('btn-success')) {
      var l = "restEdit.html?"
      var final = l.concat(f)
      window.open(final, "edit", "scrollbars=1,height=1050px,width=375px");
    }

}

function reviewDelete(e) {
    e.preventDefault();
    var f = (e.target.parentElement.parentElement.children[0].textContent);
    deleteReview(f);
    //Call server to delete review with review ID f

    if (e.target.classList.contains('btn-success')) {
      var k = 0;
      while(k<e.target.parentElement.parentElement.parentElement.children.length){
        if ( f == (e.target.parentElement.parentElement.parentElement.children[k].children[0].textContent)){
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

function del() {
  window.open("newRest.html", "edit", "scrollbars=1,height=1050px,width=375px");
}
