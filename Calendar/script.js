// this is the current date
cal_current_date = new Date();

// these are labels for the days of the week
cal_days_labels = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

// these are human-readable month name labels, in order
cal_months_labels = ['january', 'february', 'march', 'april',
                     'may', 'june', 'july', 'august', 'september',
                     'october', 'november', 'december'];

// these are the days of the week for each month, in order
cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function Calendar(month,year){
  this.month = (isNAN(month) || month == null) ? cal_current_date.getMonth() : month;
  this.year = (isNAN(year) || year == null) ? cal_current_date.getFullYear() : year;
}

function myAction () {
  // create a new div element
  var newDiv = document.createElement("div");
  // and give it some content
  var newContent = document.createTextNode("Hi there and greetings!");
  var theDate = document.createTextNode(cal_current_date);

  // add the text node to the newly created div
  newDiv.appendChild(theDate);

  // add the newly created element and its content into the DOM
  var currentDiv = document.getElementById("div1");
  document.body.insertBefore(newDiv, currentDiv);
}
$(document).ready(function(){

  $('#calendar').datepicker({
      inline: true,
      firstDay: 1,
      showOtherMonths: true,
      dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  });

});
