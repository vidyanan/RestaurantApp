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
server[yesterday] = [{"id": 1, "table": 0, "host": "Bob", "host_id": 0, "phone": "000-000-0000", "numSeats": 2, "hour": 5, "timeSlot": 30}];
server[today] = [{"id": 0, "table": 0, "host": "Tim", "host_id": 0, "phone": "000-000-0000", "numSeats": 3, "hour": 3, "timeSlot": 0}, {"id": 2, "table": 3, "host": "Jim", "host_id": 0, "phone": "000-000-0000", "numSeats": 1, "hour": 3, "timeSlot": 30}];
server[tomorrow] = [{"id": 3, "table": 5, "host": "Him", "host_id": 0, "phone": "000-000-0000", "numSeats": 5, "hour": 3, "timeSlot": 0}];

let serverMaxReservations = 5;
let serverNextID = 4;

let intToDay = {1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday", 0: "Sunday"};
let intToMonth = {0: "January", 1: "February", 2: "March", 3: "April", 4: "May", 5: "June", 6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December"};
let maxReservations;
let currentDate = new Date();
let currentReviews = 0;

const reservationList = document.querySelector('#reservationList');
const addReservationForm = document.querySelector('#addReservationForm');
const maxReservationForm = document.querySelector('#setMaxReservation');
const previousDateButton = document.querySelector('#previousDate');
const nextDateButton = document.querySelector('#nextDate');
const currentDateText = document.querySelector('#currentDate');
const calendar = document.querySelector('#calendar');
const reviewList = document.querySelector("#reviews");
const editCard = document.querySelector("#editCard");

reservationList.addEventListener('click', reservationButtonFunction);
addReservationForm.addEventListener('submit', submitReservationForm);
calendar.addEventListener('datechange', onDateChange);
maxReservationForm.addEventListener('submit', updateMaxReservations);
previousDateButton.addEventListener('click', getPreviousDay);
nextDateButton.addEventListener('click', getNextDay);
reviewList.addEventListener('click', addReview);
editCard.addEventListener('click', editCardInfo);

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
  let reservationDate = new Date(addReservationForm.datetime.value);
  const phone = addReservationForm.phone.value;
  const numSeats = addReservationForm.seats.value;

  // Test for valid input
  if (hostName === "" || isNaN(reservationDate)) {
    return;
  }

  reservationDate = fitTimeSlot(reservationDate);

  // If time slot does not conflict with max amount of reservation
  if (!doesConflict(reservationDate)) {
    createNewReservation(hostName, "Guest", reservationDate, phone, numSeats);
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

  $("#maxReservations").attr('value', maxReservations);
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

// POST creation of reservation
async function addReservationToServer(id, tableNum, hostName, hostId, phone, numSeats, reservationDate) {
  // Add new entry into database
  // {
      let serverLst = server[formatDate(reservationDate)];

      if(serverLst === undefined) { // No reservations are booked for that date yet
        server[formatDate(reservationDate)] = [{'id': id, 'table': tableNum, 'host': hostName, "host_id": hostId, 'phone': phone, 'numSeats': numSeats, 'hour': reservationDate.getHours(), 'timeSlot': reservationDate.getMinutes()}];
      } else {
        server[formatDate(reservationDate)].push({'id': id, 'table': tableNum, 'host': hostName, "host_id": hostId, 'phone': phone, 'numSeats': numSeats, 'hour': reservationDate.getHours(), 'timeSlot': reservationDate.getMinutes()});
      }
  // }

  return true;
}

// Creates a new reservation on reservationList
function createNewReservation(hostName, hostId, reservationDate, phone, numSeats) {
  let tableNum = getFreeTable(reservationDate);
  let id = getNewReservationId();

  addReservationToServer(id, tableNum, hostName, hostId, phone, numSeats, reservationDate);

  if (isCurrentDay(reservationDate)) {
    addReservation(hostName, hostId, reservationDate, tableNum, id, phone, numSeats)
  }
}

function addReservation(hostName, hostId, reservationDate, tableNum, id, phone, numSeats) {
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

  // Host id
  reservationInfo = reservationInfo.cloneNode(false);
  reservationInfo.innerText = hostId;
  newReservation.appendChild(reservationInfo);

  // Host phone number
  reservationInfo = reservationInfo.cloneNode(false);
  reservationInfo.innerText = phone;
  newReservation.appendChild(reservationInfo);

  // Date of reservation
  reservationInfo = reservationInfo.cloneNode(false);
  reservationInfo.innerText = getStandardTimeFormat(reservationDate);
  newReservation.appendChild(reservationInfo);

  // Number of seats
  reservationInfo = reservationInfo.cloneNode(false);
  reservationInfo.innerText = numSeats;
  newReservation.appendChild(reservationInfo);

  // View profile of patron
  let viewProfile = document.createElement('button');
  viewProfile.setAttribute('type', 'button');
  viewProfile.setAttribute('class', 'btn btn-primary');
  viewProfile.innerHTML = "View Profile";
  newReservation.appendChild(viewProfile);

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

function openPopup(pageUrl, id) {
    let newUrl = pageUrl + "?" + id;
    window.open(newUrl, "edit", "scrollbars=1,height=1050px,width=375px");
}

// Occurs when the remove button on a reservation occurs
function reservationButtonFunction(e) {
  e.preventDefault();

  let parentNode = e.target;

  if (parentNode.getAttribute('class') === 'btn btn-primary') {
      // View person's profile
      const hostId = parentNode.parentNode.childNodes[3].innerText;

      if(hostId === "Guest") {
          window.alert("Guest does not have a profile!");
      } else {
          openPopup("userView.html", hostId);
      }
  }
  // If they clicked on the text instead of the button
  else if (parentNode.getAttribute('class') === 'fas fa-trash-alt') {
    // Try to remove
    parentNode = parentNode.parentNode;

    if (parentNode.getAttribute('class') === "btn btn-danger") {
      deleteReservation(parentNode.parentNode);
    }
  }
}

// POST removal of reservation
async function removeReservationFromServer(child) {
  // Remove entry from database
  // {
      // irl it would go by id
      let id = parseInt(child.firstChild.innerText);
      let date = new Date(child.firstChild.nextSibling.nextSibling.nextSibling.innerText);
      let serverLst = server[formatDate(currentDate)];

      if (serverLst === undefined) {
        console.log("Date does not exist to be deleted!");
        return false;
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

  return true;
}

// Remove reservation from reservationList
function deleteReservation(child) {
  reservationList.removeChild(child);

  removeReservationFromServer(child)
}

// Removes but doesn't delete all reservations
function removeAllReservations() {
  let child;
  // Remove all reservations
  while((child = reservationList.firstElementChild)) {
    reservationList.removeChild(child);
  }
}

// GET from server
async function requestDayReservations(date) {
  // Call database to get all dates on date
  // {
    let dates = server[formatDate(date)];
    if (dates === undefined) {
      // No reservations exist on the current Date!
      return;
    }
    // sort in sql
  // }
  return dates;
}

function addReservations(dates) {
  let tempDate = currentDate;
  for (let i = 0; i < dates.length; i++) {
    tempDate.setHours(dates[i]['hour']);
    tempDate.setMinutes(dates[i]['timeSlot']);
    addReservation(dates[i]['host'], dates[i]['host_id'], tempDate, dates[i]['table'], dates[i]['id'], dates[i]['phone'], dates[i]['numSeats']);
  }
}

// Puts reservations on reservationList for all entries on date
function createDayReservations() {
  removeAllReservations();

  // GET all reservations on this day then add them to the screen
  requestDayReservations(currentDate).then(addReservations);
}

// Creates entries for the current day
function createCurrentDayReservations() {
  createDayReservations(currentDate);

  updateTextDate();
}

// // // // // // // // // // //
// Review modifying functions //
// // // // // // // // // // //

function createReview(review) {
    return $('<csc309-restaurant-review></csc309-restaurant-review')
    .attr('heading', review['name'])
    .attr('comment', review['comment'])
    .attr('stars', review['stars'])
    .attr('date', new Date(review['createdAt']).toLocaleDateString());
}

function constructReviewHTML(reviewContext) {
    let newRow = document.createElement("div");
    newRow.setAttribute("class", "row justify-content-center");

    $(newRow).append(createReview(reviewContext));

    return newRow;
}

function addReviews(maxLoad) {
    $.get('/review').then((reviews) => {
        for(let i = 0; i < Math.min(maxLoad, reviews.length); i++) {
            $("#reviews").append(constructReviewHTML(reviews[i]));
    }
    });
}

function createReviewPrompt() {
  let group = document.createElement('div');
  group.setAttribute('class', 'input-group');

  let input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('class', 'form-control');

  let buttonDiv = document.createElement('div');
  buttonDiv.setAttribute('class', 'input-group-append');

  let button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.setAttribute('class', 'btn btn-primary');
  button.innerText = 'Publish';

  buttonDiv.appendChild(button);
  group.appendChild(input);
  group.appendChild(buttonDiv);
  return group;
}

function addReview(e) {
  const target = e.target;

  if(target.parentNode.id.localeCompare("reviews") &&
     target.className === '' && target.nextSibling === null) {
      // If you click on a review
      $(createReviewPrompt()).insertAfter(target);
  }

  else if(target.parentNode.className === 'input-group-append') {
      const originalText = $(target.parentNode.parentNode).prev()[0].getAttribute('comment');
      let reviewText = '"' + originalText + '": ' + $(target.parentNode).prev().val();

      if(reviewText.length !== 0) {
        const originalReview = target.parentNode.parentNode.parentNode;
        const reviewObj = {'name': 'Owner', 'comment': reviewText, 'stars': 0, 'createdAt': new Date()};

        $.post('/review?name="Owner"&stars=0&comment=' + reviewText).then((res) => {
            // Remove text box
            $(target.parentNode.parentNode).remove();
            // Put the owner's reply on the page
            $(constructReviewHTML(reviewObj)).insertAfter(originalReview);
        });
      }
  }
}

function editCardInfo() {
    openPopup("restCardEdit.html", "restId");
}

// Run startup procedures
function initialize() {
  addReviews(6);
  retrieveMaxReservations();
  createCurrentDayReservations();
}

window.onload=initialize;
