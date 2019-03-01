// // // // // // // // // // // // // // // // // //
// TEMPORARY SERVER/DATABASE VARIABLE FOR PHASE 1 //
// // // // // // // // // // // // // // // // // //
let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
yesterday = formatDate(yesterday);
let today = new Date();
today = formatDate(today);
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow = formatDate(tomorrow);

let server = {};
server[yesterday] = [{"id": 1, "table": 0, "host": "Bob", "hour": 5, "timeSlot": 30}];
server[today] = [{"id": 0, "table": 0, "host": "Tim", "hour": 3, "timeSlot": 0}, {"id": 2, "table": 3, "host": "Jim", "hour": 3, "timeSlot": 30}];
server[tomorrow] = [{"id": 3, "table": 5, "host": "Him", "hour": 3, "timeSlot": 0}];

let serverMaxReservations = 5;
let serverNextID = 4;



let maxReservations;
let currentDate = new Date();

const reservationList = document.querySelector('#reservationList');
const addReservationForm = document.querySelector('#addReservationForm');
const maxReservationForm = document.querySelector('#maxReservationForm');
const previousDateButton = document.querySelector('#previousDate');
const nextDateButton = document.querySelector('#nextDate');
const currentDateText = document.querySelector('#currentDate');

reservationList.addEventListener('click', removeButtonFunction);
addReservationForm.addEventListener('submit', submitReservationForm);
maxReservationForm.addEventListener('click', updateMaxReservations);
previousDateButton.addEventListener('click', getPreviousDay);
nextDateButton.addEventListener('click', getNextDay);

// // // // // // //
// Date Functions //
// // // // // // //

// Fits date into the restaurant's time slots
function fitTimeSlot(date) {
  // 30 minute time slots
  date.setMinutes(Math.round(date.getMinutes() / 30) * 30);
  return date;
}

// Checks if there are too many reservations for another at time date
function doesConflict(date) {
  let hour = date.getHours();
  let timeSlot = date.getMinutes();

  let reservCount = 0;

  // Query database to get count of reservations at that time slot on that day
  // {
      let serverLst = server[formatDate(date)];
      for(let i = 0; i < serverLst.length; i++) {
        if(serverLst[i]['hour'] === hour || serverLst[i]['timeSlot'] === timeSlot) {
          reservCount++;
        }
      }
  // }

  return reservCount > maxReservations;
}

// Checks if date is the currently displayed date
function isCurrentDay(date) {
  return currentDate.getDate() === date.getDate() && currentDate.getMonth() === date.getMonth() && currentDate.getFullYear() === date.getFullYear();
}

// Get reservations for the next day
function getNextDay() {
  currentDate.setDate(currentDate.getDate() + 1);

  createCurrentDayReservations();
}

// Get reservations for the previous day
function getPreviousDay() {
  currentDate.setDate(currentDate.getDate() - 1);

  createCurrentDayReservations();
}

function formatDate(date) {
  return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}

// Changes the html date on the page
function updateTextDate() {
  currentDateText.innerText = formatDate(currentDate);
}

// // // // // // // // //
// Reservation Functions //
// // // // // // // // //

// Submit a new reservation
function submitReservationForm(e) {
  e.preventDefault();

  const hostName = addReservationForm.hostName.value;
  let reservationDate = new Date(addReservationForm.reservationDate.value);

  reservationDate = fitTimeSlot(reservationDate);

  // If time slot does not conflict with max amount of reservation
  if (!doesConflict(reservationDate) && isCurrentDay(reservationDate)) {
    createNewReservation(hostName, reservationDate);
  }
}

// Get the lowest new reservation id
function getNewReservationId() {
  let newId;

  // Call database
  // {
    newId = serverNextID;
    serverNextID++;
  // }
  return newId;
}

// Updates the maximum reservations allowed in a time slot
function updateMaxReservations(e) {
  e.preventDefault();

  const newMax = maxReservationForm.maxReservations.value;
  maxReservations = newMax;

  // Call to database to update the max
  serverMaxReservations = maxReservations;
}

// Only called on startup
function retrieveMaxReservations() {
  maxReservations = serverMaxReservations; // Call to database to find out the actual max
}

function getFreeTable(date) {
  let table = 0;

  // Query database to return the first table free at date
  //{
    // This function just goes through the dictionary in server until an incremented int doesn't appear for that date
    let list = server[formatDate(date)];
    let tempTable = 1;
    while(table === 0) {
      for (let i = 0; i < list.length; i++) {
        if(list[i]['table'] === tempTable) {
          break;
        } else if (i === list.length - 1) {
          table = tempTable;
        }
      }
      tempTable++;
    }
  //}

  return table;
}

// // // // // // // // // // // // //
// Reservation Modifying Functions //
// // // // // // // // // // // // //

// Creates a new reservation on reservationList
function createNewReservation(hostName, reservationDate) {
  let tableNum = getFreeTable(reservationDate);
  let id = getNewReservationId();

  // Add new entry into database
  // {
      for(let i = 0; i < Object.keys(server).length; i++) {
        if (formatDate(reservationDate) === Object.keys(server)[i]) {
          server[formatDate(reservationDate)].push({'id': id, 'table': tableNum, 'host': hostName, 'hour': reservationDate.getHours(), 'timeSlot': reservationDate.getMinutes()});
          break;
        } else if (i === Object.keys(server).length - 1) {
          server[formatDate(reservationDate)] = [{'id': id, 'table': tableNum, 'host': hostName, 'hour': reservationDate.getHours(), 'timeSlot': reservationDate.getMinutes()}];
        }
      }
  // }

  addReservation(hostName, reservationDate, tableNum, id)
}

function addReservation(hostName, reservationDate, tableNum, id) {
  let newReservation = document.createElement('div');
  newReservation.setAttribute('class', 'row');

  // Create default tag for reservation info
  let reservationInfo = document.createElement('div');
  reservationInfo.setAttribute('class', 'col');

  reservationInfo.innerText = id;
  newReservation.appendChild(reservationInfo);

  reservationInfo = reservationInfo.cloneNode(false);
  reservationInfo.innerText = tableNum;
  newReservation.appendChild(reservationInfo);

  reservationInfo = reservationInfo.cloneNode(false);
  reservationInfo.innerText = hostName;
  newReservation.appendChild(reservationInfo);

  reservationInfo = reservationInfo.cloneNode(false);
  reservationInfo.innerText = reservationDate;
  newReservation.appendChild(reservationInfo);

  let removeReservation = document.createElement('button');
  removeReservation.setAttribute('class', 'removeReservation');
  removeReservation.innerText = "Remove Reservation";
  newReservation.appendChild(removeReservation);

  reservationList.appendChild(newReservation);
}

// Occurs when the remove button on a reservation occurs
function removeButtonFunction(e) {
  e.preventDefault();

  if (e.target.getAttribute('class') === "removeReservation") {
    deleteReservation(e.target.parentNode);
  }
}

// Remove reservation from reservationList
function deleteReservation(child) {
  reservationList.removeChild(child);

  // Remove entry from database
  // {
      // irl it would go by id
      let id = parseInt(child.firstChild.innerText);
      let date = new Date(child.firstChild.nextSibling.nextSibling.nextSibling.innerText);
      let serverLst = server[formatDate(date)];

      for(let i = 0; i < serverLst.length; i++) {
        if(serverLst[i]['id'] === id) {
          serverLst.splice(i, 1);
          server[formatDate(date)] = serverLst;
          break;
        }
      }
  // }
}

// Removes but doesn't delete all reservations
function removeAllReservations() {
  let header = reservationList.firstElementChild;

  let child;
  // Remove all reservations
  while((child = reservationList.firstElementChild)) {
    reservationList.removeChild(child);
  }

  // Add the header back
  reservationList.appendChild(header);
}

// Puts reservations on reservationList for all entries on date
function createDayReservations() {
  let dates;

  // Call database to get all dates on date
  // {
      dates = server[formatDate(currentDate)];
      // sort in sql
  // }

  removeAllReservations();

  let tempDate = currentDate;
  for (let i = 0; i < dates.length; i++) {
    tempDate.setHours(dates[i]['hour']);
    tempDate.setMinutes(dates[i]['timeSlot']);
    addReservation(dates[i]['host'], tempDate, dates[i]['table'], dates[i]['id']);
  }
}

// Creates entries for the current day
function createCurrentDayReservations() {
  createDayReservations(currentDate);

  updateTextDate();
}

// Run startup procedures
function initialize() {
  retrieveMaxReservations();
  createCurrentDayReservations();
}

window.onload=initialize;
