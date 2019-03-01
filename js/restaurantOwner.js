const bookingList = document.querySelector('#bookingList');
const addBookingForm = document.querySelector('#addBookingForm');
const maxReservationForm = document.querySelector('#maxReservationForm');
const previousDateButton = document.querySelector('#previousDate');
const nextDateButton = document.querySelector('#nextDate');
const currentDateText = document.querySelector('#currentDate');

let maxReservations;
let currentDate = new Date();

bookingList.addEventListener('click', removeBooking);
addBookingForm.addEventListener('submit', submitBookingForm);
maxReservationForm.addEventListener('submit', updateMaxReservations);
previousDateButton.addEventListener('click', getPreviousDay);
nextDateButton.addEventListener('click', getNextDay);

// Remove reservation from book list
function removeBooking(e) {
  bookingList.removeChild(e.target.parentNode);
}

// Get reservations for the next day
function getNextDay(e) {
  currentDate.setDate(currentDate.getDate() + 1);

  createCurrentDayReservations();
}

// Get reservations for the previous day
function getPreviousDay(e) {
  currentDate.setDate(currentDate.getDate() - 1);

  createCurrentDayReservations();
}

// Get the lowest new booking id
function getNewBookingId() {
  // Call database
  return 1;
}

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

// Submit a new reservation
function submitBookingForm(e) {
  e.preventDefault();

  const tableNum = addBookingForm.tableNum.value;
  const hostName = addBookingForm.hostName.value;
  let bookingDate = new Date(addBookingForm.bookingDate.value);

  bookingDate = fitTimeSlot(bookingDate);

  // If time slot does not conflict with max amount of reservation
  if (!doesConflict(bookingDate) && isCurrentDay(bookingDate)) {
    createNewBooking(tableNum, hostName, bookingDate);
  }
}

// Creates a new reservation on book list
function createNewBooking(tableNum, hostName, bookingDate) {
  // Add new entry into database

  let newBooking = document.createElement('div');
  newBooking.setAttribute('class', 'row');

  // Create default tag for booking info
  let bookingInfo = document.createElement('div');
  bookingInfo.setAttribute('class', 'col');

  bookingInfo.innerText = getNewBookingId();
  newBooking.appendChild(bookingInfo);

  bookingInfo = bookingInfo.cloneNode(false);
  bookingInfo.innerText = tableNum;
  newBooking.appendChild(bookingInfo);

  bookingInfo = bookingInfo.cloneNode(false);
  bookingInfo.innerText = hostName;
  newBooking.appendChild(bookingInfo);

  bookingInfo = bookingInfo.cloneNode(false);
  bookingInfo.innerText = bookingDate;
  newBooking.appendChild(bookingInfo);

  let removeBooking = document.createElement('button');
  removeBooking.setAttribute('class', 'removeBooking');
  removeBooking.innerText = "Remove Booking";
  newBooking.appendChild(removeBooking);

  bookingList.appendChild(newBooking);
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

function removeAllReservations() {
  let header = bookingList.firstElementChild;

  let child;
  // Remove all reservations
  while((child = bookingList.firstElementChild)) {
    bookingList.removeChild(child);
  }

  // Add the header back
  bookingList.appendChild(header);
}

// Puts reservations on book list for all entries on date
function createDayReservations(date) {
  let dates = [];

  // Call database to get all dates on date

  dates.sort();

  removeAllReservations();

  for (let i = 0; i < dates.length; i++) {
    createNewBooking(dates[i]);
  }
}

// Creates entries for the current day
function createCurrentDayReservations() {
  createDayReservations(currentDate);

  updateTextDate();
}

// Changes the html date on the page
function updateTextDate() {
  currentDateText.innerText = (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear();
}

window.onload=retrieveMaxReservations;
window.onload=createCurrentDayReservations;
