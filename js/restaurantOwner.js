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
server[yesterday] = [{"id": 1, "table": 0, "host": "Bob", "phone": "000-000-0000", "numSeats": 2, "hour": 5, "timeSlot": 30}];
server[today] = [{"id": 0, "table": 0, "host": "Tim", "phone": "000-000-0000", "numSeats": 3, "hour": 3, "timeSlot": 0}, {"id": 2, "table": 3, "host": "Jim", "phone": "000-000-0000", "numSeats": 1, "hour": 3, "timeSlot": 30}];
server[tomorrow] = [{"id": 3, "table": 5, "host": "Him", "phone": "000-000-0000", "numSeats": 5, "hour": 3, "timeSlot": 0}];

let serverMaxReservations = 5;
let serverNextID = 4;

let intToDay = {0: "Monday", 1: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday", 7: "Sunday"};
let intToMonth = {0: "January", 1: "February", 2: "March", 3: "April", 4: "May", 5: "June", 6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December"};
let maxReservations;
let currentDate = new Date();

const reservationList = document.querySelector('#reservationList');
const addReservationForm = document.querySelector('#addReservationForm');
const maxReservationForm = document.querySelector('#setMaxReservation');
const previousDateButton = document.querySelector('#previousDate');
const nextDateButton = document.querySelector('#nextDate');
const currentDateText = document.querySelector('#currentDate');
const calendar = document.querySelector('#calendar');

reservationList.addEventListener('click', removeButtonFunction);
addReservationForm.addEventListener('submit', submitReservationForm);
calendar.addEventListener('datechange', onDateChange);
maxReservationForm.addEventListener('submit', updateMaxReservations);
previousDateButton.addEventListener('click', getPreviousDay);
nextDateButton.addEventListener('click', getNextDay);

// // // // // // //
// Date Functions //
// // // // // // //

// From the restaurant page
/**
   * Sets the date when a day in the calendar is clicked.
   *
   * @param {CustomEvent} event
   */
function onDateChange(event) {
  const value = event.detail;

  const leftZeroPad = n => (n >= 10 ? String(n) : `0${n}`);

  const year = value.getFullYear();
  const month = leftZeroPad(value.getMonth() + 1);
  const day = leftZeroPad(value.getDate());
  const hour = leftZeroPad(value.getHours());
  const minute = leftZeroPad(value.getMinutes());

  const datetimeLocal = `${year}-${month}-${day}T${hour}:${minute}`;

  $("#datetime").val(datetimeLocal);
}

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

      // If it is undefined then there are no reservations to count
      if (serverLst !== undefined) {
        for(let i = 0; i < serverLst.length; i++) {
          if (serverLst[i]['hour'] === hour || serverLst[i]['timeSlot'] === timeSlot) {
            reservCount++;
          }
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
  currentDateText.innerText = getStandardDateFormat(currentDate);
}

function getStandardDateFormat(Date) {
  let day = intToDay[Date.getDay()];
  let date = Date.getDate();
  let dateEnd = "th";
  let month = intToMonth[Date.getMonth()];
  let year = Date.getFullYear();

  if (date < 3) {
    if (date === 0) {
      dateEnd = "st";
    }
    else if (date === 1) {
      dateEnd = "nd";
    }
    else {
      dateEnd = "rd";
    }
  }

  return day + " " + month + " " + date + dateEnd + ", " + year;
}

function getStandardTimeFormat(Date) {
  let hours = Date.getHours();
  let minutes = Date.getMinutes();
  let amPM = "AM";

  if (hours > 12) {
    hours = hours % 12;
    amPM = "PM"
  }

  if (minutes === 0) {
    minutes = "00"
  }

  return hours + ":" + minutes + " " + amPM;
}

// // // // // // // // //
// Reservation Functions //
// // // // // // // // //

// Submit a new reservation
function submitReservationForm(e) {
  e.preventDefault();

  const hostName = addReservationForm.name.value;
  let reservationDate = new Date(addReservationForm.reservationDate.value);
  const phone = addReservationForm.phone.value;
  const numSeats = addReservationForm.seats.value;

  // Test for valid input
  if (hostName === "" || isNaN(reservationDate)) {
    return;
  }

  reservationDate = fitTimeSlot(reservationDate);

  // If time slot does not conflict with max amount of reservation
  if (!doesConflict(reservationDate)) {
    createNewReservation(hostName, reservationDate, phone, numSeats);
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

  if (newMax === "") {
    // No input found!
    return;
  }

  maxReservations = newMax;

  // Call to database to update the max
  serverMaxReservations = maxReservations;
}

// Only called on startup
function retrieveMaxReservations() {
  maxReservations = serverMaxReservations; // Call to database to find out the actual max

  $("#maxReservations").val(maxReservations);
}

function getFreeTable(date) {
  let table = 1;

  // Query database to return the first table free at date
  //{
    // This function just goes through the dictionary in server until an incremented int doesn't appear for that date
    let list = server[formatDate(date)];

    if (list !== undefined) {
      let tempTable = 1;
      while (table === 0) {
        for (let i = 0; i < list.length; i++) {
          if (list[i]['table'] === tempTable) {
            break;
          } else if (i === list.length - 1) {
            table = tempTable;
          }
        }
        tempTable++;
      }
    }
  //}

  return table;
}

// // // // // // // // // // // // //
// Reservation Modifying Functions //
// // // // // // // // // // // // //

// Creates a new reservation on reservationList
function createNewReservation(hostName, reservationDate, phone, numSeats) {
  let tableNum = getFreeTable(reservationDate);
  let id = getNewReservationId();

  // Add new entry into database
  // {
      let serverLst = server[formatDate(reservationDate)];

      if(serverLst === undefined) { // No reservations are booked for that date yet
        server[formatDate(reservationDate)] = [{'id': id, 'table': tableNum, 'host': hostName, 'phone': phone, 'numSeats': numSeats, 'hour': reservationDate.getHours(), 'timeSlot': reservationDate.getMinutes()}];
      } else {
        server[formatDate(reservationDate)].push({'id': id, 'table': tableNum, 'host': hostName, 'phone': phone, 'numSeats': numSeats, 'hour': reservationDate.getHours(), 'timeSlot': reservationDate.getMinutes()});
      }
  // }

  if (isCurrentDay(reservationDate)) {
    addReservation(hostName, reservationDate, tableNum, id, phone)
  }
}

function addReservation(hostName, reservationDate, tableNum, id, phone, numSeats) {
  let newReservation = document.createElement('tr');

  // Create default tag for reservation info
  let reservationInfo = document.createElement('td');
  reservationInfo.setAttribute('scope', 'row');

  // Reservation ID
  reservationInfo.innerText = id;
  newReservation.appendChild(reservationInfo);

  // Table number
  reservationInfo = reservationInfo.cloneNode(false);
  reservationInfo.innerText = tableNum;
  newReservation.appendChild(reservationInfo);

  // Host name
  reservationInfo = reservationInfo.cloneNode(false);
  reservationInfo.innerText = hostName;
  newReservation.appendChild(reservationInfo);

  // Host phone number
  reservationInfo = reservationInfo.cloneNode(false);
  reservationInfo.innerText = phone;
  newReservation.appendChild(reservationInfo);

  // Number of seats
  reservationInfo = reservationInfo.cloneNode(false);
  reservationInfo.innerText = numSeats;
  newReservation.appendChild(reservationInfo);

  // Date of reservation
  reservationInfo = reservationInfo.cloneNode(false);
  reservationInfo.innerText = getStandardTimeFormat(reservationDate);
  newReservation.appendChild(reservationInfo);

  // Remove button
  let removeReservation = document.createElement('button');
  removeReservation.setAttribute('type', 'button');
  removeReservation.setAttribute('class', 'btn btn-danger');

  // Button icon & text
  let removeInner = document.createElement('span');
  removeInner.setAttribute('class', 'fas fa-trash-alt');
  removeInner.innerText += " Remove";

  removeReservation.appendChild(removeInner);
  newReservation.appendChild(removeReservation);

  reservationList.appendChild(newReservation);
}

// Occurs when the remove button on a reservation occurs
function removeButtonFunction(e) {
  e.preventDefault();

  let parentNode = e.target;

  // If they clicked on the text instead of the button
  if (parentNode.getAttribute('class') === 'fas fa-trash-alt') {
    parentNode = parentNode.parentNode;
  }


  if (parentNode.getAttribute('class') === "btn btn-default btn-sm") {
    deleteReservation(parentNode.parentNode);
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
      let serverLst = server[formatDate(currentDate)];

      if (serverLst === undefined) {
        console.log("Date does not exist to be deleted!");
      } else {
        for (let i = 0; i < serverLst.length; i++) {
          if (serverLst[i]['id'] === id) {
            serverLst.splice(i, 1);
            server[formatDate(date)] = serverLst;
            break;
          }
        }
      }
  // }
}

// Removes but doesn't delete all reservations
function removeAllReservations() {
  let child;
  // Remove all reservations
  while((child = reservationList.firstElementChild)) {
    reservationList.removeChild(child);
  }
}

// Puts reservations on reservationList for all entries on date
function createDayReservations() {
  let dates;

  removeAllReservations();

  // Call database to get all dates on date
  // {
      dates = server[formatDate(currentDate)];
      if (dates === undefined) {
        // No reservations exist on the current Date!
        return;
      }
      // sort in sql
  // }

  let tempDate = currentDate;
  for (let i = 0; i < dates.length; i++) {
    tempDate.setHours(dates[i]['hour']);
    tempDate.setMinutes(dates[i]['timeSlot']);
    addReservation(dates[i]['host'], tempDate, dates[i]['table'], dates[i]['id'], dates[i]['phone'], dates[i]['numSeats']);
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
