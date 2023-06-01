// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = scrollFunction;
window.addEventListener('load', dateFunction, false);

function dateFunction() {
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  var today = new Date();
  var nextFriday = nextWeekdayDate(today, 5).toLocaleDateString("en-US", options);
  var nextSaturday = nextWeekdayDate(today, 6).toLocaleDateString("en-US", options);
  //var nextSunday = nextWeekdayDate(today, 7).toLocaleDateString("en-US", options);
 

  document.getElementById('today-date').innerHTML = today.toLocaleDateString("en-US", options);
  document.getElementById('nextFriday').innerHTML = nextFriday;
  document.getElementById('nextSaturday').innerHTML = nextSaturday;
  document.getElementById('noOfDaysBeforeRamadan').innerHTML = dateDifference();
}


function nextWeekdayDate(date, day_in_week) {
  var ret = new Date(date || new Date());
  ret.setDate(ret.getDate() + (day_in_week - 1 - ret.getDay()) % 7 + 1);
  return ret;
}


function scrollFunction() {
  //Get the button
  var mybutton = document.getElementById("myBtn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function dateDifference() {

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

//today = mm + '/' + dd + '/' + yyyy;
  //var date1 = new Date("06/30/2019");
  var ramadanStartDate = new Date("04/02/2022");

  // To calculate the time difference of two dates 
  var Difference_In_Time = ramadanStartDate.getTime() - today.getTime();

  // To calculate the no. of days between two dates 
  var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

  console.log("todays date with time " + today)
  console.log("ramadan date with time " + ramadanStartDate)
  console.log("Difference in time  " + Difference_In_Time)
  console.log("Difference_In_Days"+ Difference_In_Days)

  return Difference_In_Days;
}

$(document).ready(function () {
  $('.my-date').hijriDate({
    showWeekDay: false,
    showGregDate: false,
    separator: '&nbsp;|&nbsp;',
    weekDayLang: 'en',
    hijriLang: 'en',
    gregLang: 'en',
    correction: +1
  });
});
