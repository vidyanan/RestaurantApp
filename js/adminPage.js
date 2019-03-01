

const userTable = document.getElementById('table table-user')
const restTable = document.getElementById('table table-rest')
const reviewTable = document.getElementById('table table-review')

userTable.addEventListener('click', openUserEdit);
restTable.addEventListener('click', openRestEdit);
reviewTable.addEventListener('click', reviewDelete);


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
