const myform = document.querySelector('#cardForm');
const cuisineElement = document.querySelector('#cuisines');

myform.addEventListener('click', buttonAction);

let inputField = document.createElement('div');
inputField.setAttribute('class', 'col');

let temp = document.createElement('input');
temp.setAttribute("type", "text");
temp.setAttribute("name", "food");

inputField.appendChild(temp);

async function getCuisines(restId) {
  return $.get('restaurant/' + restId);
}

async function saveCuisines() {
  let cuisines = [];

  let children = document.getElementsByName('food');

  for(let i = 0; i < children.length; i++) {
    let tempVal = children[i].value;

    if(tempVal !== "" && typeof tempVal !== "undefined") {
      cuisines.push(tempVal);
    }
  }

  // Push to server
  console.log(cuisines);

  return true;
}

async function fillInData(){
  let restId = 0;

  await getCuisines(restId).then((cuisines) => {
    for(let i = 0; i < cuisines.length; i++) {
          let tempField = inputField.cloneNode(true);
          tempField.childNodes[0].value = cuisines[i];
          cuisineElement.appendChild(tempField);
      }
  });
}

async function buttonAction(e){
  console.log(e.target);
  if (e.target.className.includes('btn btn-primary')) {
    console.log("did");
    cuisineElement.appendChild(inputField);
  }
  else if (e.target.className.includes('btn btn-success')) {
      //Push changes to server
      await saveCuisines().then((hasSaved) => {
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
