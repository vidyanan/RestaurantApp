const myform = document.querySelector('#cardForm');

myform.addEventListener('click', buttonAction);

let inputField = document.createElement('div');
inputField.setAttribute('class', 'col');

let restObj;

async function getRestaurantObj(restId) {
  return $.get('restaurant/' + restId);
}

async function pushToServer() {
  console.log($('#cuisine').val());
  return new Promise((resolve, reject) => {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": `/restaurant?name=${restObj['name']}&location=${restObj['location']}&cuisine=${$('#cuisine').val()}&featuredImage=${$('#featureLocation').val()}`,
      "method": "PUT",
      "headers": {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      },
      "processData": false
    })
      .done(resolve)
      .fail(reject);
  })
}

function getRestId() {
    let url = new URL(window.location);
    let params = url.searchParams;
    let id = params.get('id');

    if(id === null) {
        console.log("Id not given!");
        window.close();
    } else {
      return id;
    }
}

async function fillInData(){
  let restId = getRestId();

  restObj = await getRestaurantObj(restId);

  $('#cuisine').val(restObj['cuisine']);
  $('#featureLocation').val(restObj['featuredImage']);
}

async function buttonAction(e){
  if (e.target.className.includes('btn btn-success')) {
      //Push changes to server
      await pushToServer().then((hasSaved) => {

          console.log(hasSaved)

          if(hasSaved) {
              window.alert("Successfully saved!");
          } else {
              window.alert("Save error!");
          }
      });
  }
  else if (e.target.className.includes('btn btn-danger')) {
      window.close();
  }
}

window.onload=fillInData;
