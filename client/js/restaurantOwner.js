import {
  getRestaurantBySlug,
  getRestaurantReviewsByRestaurantId,
  createRestaurantBooking,
  createRestaurantReview,
  deleteServerReservation,
  getRestaurantReservationsByRestaurantIdAndDate
} from '/js/network/index.js';

// Global restaurant object
let restObj = null;
let tableCount = 0;

window.addEventListener('CSC309CustomElementsReady', () => {
  $("#booking").on('submit', onCreateBookingSubmit);
  $("#review").on("submit", onCreateReviewSubmit);
  $("#calendar").on("datechange", onCalendarDateChange);

  const query = new URLSearchParams(location.search);
  const slug = query.get('slug');
  $(".restaurant-slug").val(slug)

  // GET restaurant from server and render it
  getRestaurantBySlug(slug)
    .then((restaurant) => {
      restObj = restaurant;

      renderRestaurant(restaurant)

      $(".restaurant-id").val(restaurant._id)

      //retrieveMaxReservations(restaurant);
      createCurrentDayReservations(restaurant);

      // GET restaurant reviews from server and render them
      getRestaurantReviewsByRestaurantId(restaurant._id)
        .then(renderReviews);
    })
    .catch(handleRestaurantError)
});

function renderRestaurant(restaurant) {
  $('#restaurant-featuredimage')
    .attr('src', restaurant.featuredImage);

  $('#restaurant-dollars')
    .attr('count', restaurant.dollars);

  $('#restaurant-stars')
    .attr('count', restaurant.stars);

  return $('#restaurant-card')
    .attr('heading', restaurant.name)
    .attr('description', restaurant.cuisine);
}

function handleRestaurantError(err) {
  const status = err.status || 500;
  switch (status) {
    case 404:
      return renderPageError('Restaurant does not exist!');

    default:
      return renderPageError('Internal error, something went wrong with our servers, please contact us!');
  }
}

function renderPageError(text) {
  return $('#page')
    .empty()
    .addClass('container')
    .append($('<h1 class="h3 mt-5"></h1>').text(text));
}

function renderReviews(reviews) {
  return $("#reviews")
    .append(reviews.map(renderReview))
}

function renderReview(review) {
  return $('<csc309-restaurant-review></csc309-restaurant-review')
    .attr('heading', review.name)
    .attr('comment', review.comment)
    .attr('stars', review.stars)
    .attr('date', new Date(review.createdAt).toLocaleDateString())
}

/**
 * Sets the date when a day in the calendar is clicked.
 *
 * @param {CustomEvent} event
 */
function onCalendarDateChange(event) {
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

// POST booking to server
async function onCreateBookingSubmit(event) {
  try {
    $('#booking .text-danger').text('');
    event.preventDefault();
    let data = new FormData(event.target);
    data.append('table', tableCount);
    tableCount += 1;

    const resQuery = await createRestaurantBooking(data);

    const name = data.get('name');
    const hostId = 'Guest';
    let reservationDate = new Date(data.get('startTime'));
    const phone = data.get('phonenumber');
    const numSeats = data.get('seats');

    createNewReservation(name, hostId, reservationDate, resQuery['_id'], phone, numSeats);

    alert(`${data.get('name')}, we have received your booking!`)
    event.target.reset();
  } catch (err) {
    console.error(err);
    $('#booking .text-danger').text(
      err.responseJSON
      ? err.responseJSON.message || err.responseJSON.errmsg
      : 'Internal error, please try again'
    );
  }
}

// POST review to server
async function onCreateReviewSubmit(name, stars, comment) {
  try {
    $('#review .text-danger').text('');
    let data = new FormData();
    data.append('name', name);
    data.append('stars', stars);
    data.append('comment', comment);
    data.append('restaurantId', restObj._id);
    await createRestaurantReview(data);
    $("#reviews").append(
      renderReview({
        name: data.get("name"),
        stars: data.get("stars"),
        comment: data.get("comment"),
        createdAt: new Date(),
      })
    );
  } catch (err) {
    console.error(err);
    $('#review .text-danger').text(
      err.responseJSON
      ? err.responseJSON.message || err.responseJSON.errmsg
      : 'Internal error, please try again'
    );
  }
}

let intToDay = {1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday", 0: "Sunday"};
let intToMonth = {0: "January", 1: "February", 2: "March", 3: "April", 4: "May", 5: "June", 6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December"};
let maxReservations;
let currentDate = new Date();

const reservationList = document.querySelector('#reservationList');
const maxReservationForm = document.querySelector('#setMaxReservation');
const previousDateButton = document.querySelector('#previousDate');
const nextDateButton = document.querySelector('#nextDate');
const currentDateText = document.querySelector('#currentDate');
const calendar = document.querySelector('#calendar');
const reviewList = document.querySelector("#reviews");
const editCard = document.querySelector("#editCard");

reservationList.addEventListener('click', reservationButtonFunction);
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

  createCurrentDayReservations(restObj);
}

// Get reservations for the previous day
function getPreviousDay() {
  currentDate.setDate(currentDate.getDate() - 1);

  createCurrentDayReservations(restObj);
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

// // // // // // // // //
// Reservation Functions //
// // // // // // // // //

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
  //maxReservations = serverMaxReservations; // Call to database to find out the actual max

  $("#maxReservations").attr('value', maxReservations);
}

// // // // // // // // // // // // //
// Reservation Modifying Functions //
// // // // // // // // // // // // //


// Creates a new reservation on reservationList
function createNewReservation(hostName, hostId, reservationDate, id, phone, numSeats) {
  let tableNum = tableCount;
  tableCount += 1;

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
  reservationInfo.innerText = reservationDate.toLocaleTimeString();//getStandardTimeFormat(reservationDate);
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
          openPopup("userView.html", 'id=' + hostId);
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
  const id = child.firstChild.innerText;

  return deleteServerReservation(id);
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

const monthToInt = {"Jan": "00", "Feb": "01", "Mar": "02", "Apr": "03", "May": "04", "June": "05", "July": "06", "Aug": "07", "Sept": "09", "Nov": "10", "Oct": "11", "Dec": "12"};

// GET from server
async function requestDayReservations(restaurant, tempDate) {
  let date = new Date(tempDate);
  date.setMonth(date.getMonth() + 1);
  const dateString = date.toDateString();
  let dateSplit = dateString.split(' ');
  const startDate = dateSplit[3] + "-" + monthToInt[dateSplit[1]] + "-" + dateSplit[2] + "T00:00";
  date.setDate(date.getDate() + 1);
  dateSplit = date.toDateString().split(' ');
  const endDate = dateSplit[3] + "-" + monthToInt[dateSplit[1]] + "-" + dateSplit[2] + "T00:00";

  return getRestaurantReservationsByRestaurantIdAndDate(restaurant._id, new Date(startDate), new Date(endDate)).then((reservations) => {
    return reservations;
  });
}

function addReservations(dates) {
  let tempDate = new Date(currentDate);
  for (let i = 0; i < dates['length']; i++) {
    tempDate.setHours(dates[i]['hour']);
    tempDate.setMinutes(dates[i]['timeSlot']);

    let table = dates[i]['table'];
    if (table === 'undefined' || table == null || isNaN(table)) {
      table = tableCount;
      tableCount += 1;
    } else {
      Math.max(tableCount, dates[i]['table'] + 1);
    }

    addReservation(dates[i]['name'], 'Guest', new Date(dates[i]['startTime']), table, dates[i]['_id'], dates[i]['phonenumber'], dates[i]['seats']);
  }
}

// Puts reservations on reservationList for all entries on date
function createDayReservations(restaurant) {
  removeAllReservations();

  // GET all reservations on this day then add them to the screen
  requestDayReservations(restaurant, currentDate).then(addReservations);
}

// Creates entries for the current day
function createCurrentDayReservations(restaurant) {
  createDayReservations(restaurant, currentDate);

  updateTextDate();
}

// // // // // // // // // // //
// Review modifying functions //
// // // // // // // // // // //

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

  if(target.parentNode.className === ("ownerComment")) {
      // If you click on a review
      if(target.nextSibling === null || target.nextSibling.className === '') {
        $(createReviewPrompt()).insertAfter(target);
      }
      else {
        $(target).next().remove();
      }
  }

  else if(target.parentNode.className === 'input-group-append') {
      const originalReview = $(target.parentNode.parentNode).prev()[0];
      const originalName = originalReview.getAttribute('heading');
      const originalText = originalReview.getAttribute('comment');
      let reviewText = '"' + originalName + ": " + originalText + '": ' + $(target.parentNode).prev().val();

      if(reviewText.length !== 0) {
        onCreateReviewSubmit(restObj.slug + " Owner", 0, reviewText);
        $(originalReview).next().remove();
      }
  }
}

function editCardInfo() {
    openPopup("restCardEdit.html", 'id=' + restObj._id);
}
