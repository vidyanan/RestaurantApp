const reservationList = document.querySelector('#reservationList');
const addReservationForm = document.querySelector('#addReservationForm');
const maxReservationForm = document.querySelector('#maxReservationForm');
const previousDateButton = document.querySelector('#previousDate');
const nextDateButton = document.querySelector('#nextDate');
const currentDateText = document.querySelector('#currentDate');

let maxReservations;
let currentDate = new Date();

reservationList.addEventListener('click', removeReservation);
addReservationForm.addEventListener('submit', submitReservationForm);
maxReservationForm.addEventListener('submit', updateMaxReservations);
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
  let day = date.getDay();
  let timeSlot = date.getTime();

  // Query database to get count of reservations at that time slot on that day
  let reservCount = 0;

  return reservCount + 1 < maxReservations;
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

// Changes the html date on the page
function updateTextDate() {
  currentDateText.innerText = (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear();
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
  // Call database
  return 1;
}

// Updates the maximum reservations allowed in a time slot
function updateMaxReservations(e) {
  e.preventDefault();

  const newMax = maxReservationForm.maxReservations.value;
  maxReservations = newMax;

  // Call to database to update the max
}

// Only called on startup
function retrieveMaxReservations() {
  maxReservations = 5; // Call to database to find out the actual max
}

function getFreeTable(date) {
  // Query database to return the first table free at date
  return 1
}

// // // // // // // // // // // // //
// Reservation Modifying Functions //
// // // // // // // // // // // // //

// Creates a new reservation on reservationList
function createNewReservation(hostName, reservationDate) {
  let tableNum = getFreeTable(reservationDate);

  // Add new entry into database

  let newReservation = document.createElement('div');
  newReservation.setAttribute('class', 'row');

  // Create default tag for reservation info
  let reservationInfo = document.createElement('div');
  reservationInfo.setAttribute('class', 'col');

  reservationInfo.innerText = getNewReservationId();
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

// Remove reservation from reservationList
function removeReservation(e) {
  reservationList.removeChild(e.target.parentNode);
}

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
  let dates = [];

  // Call database to get all dates on date

  dates.sort();

  removeAllReservations();

  for (let i = 0; i < dates.length; i++) {
    createNewReservation(dates[i]);
  }
}

// Creates entries for the current day
function createCurrentDayReservations() {
  createDayReservations(currentDate);

  updateTextDate();
}

window.onload=retrieveMaxReservations;
window.onload=createCurrentDayReservations;
