$(document).ready(function () {
  var now = moment().format("dddd MMMM Do YYYY, h:mm:ss A");
  var hourNow = moment().format("hA");
  hourNow = moment("3PM", "hA"); // THIS IS JUST A DEFAULT TEST TIME
  //  hourNow = moment(hourNow, "hA");
  // UNCOMMENT THIS TO GET REAL TIME
  var hoursArray = [
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
  ];
  // var hourNow = moment("hA");
  console.log(now);
  console.log(hourNow);
  var currentDayDisplay = $("#currentDay");
  currentDayDisplay.text(now);

  var EventTimeList = []; // holds objects; pairs of events and times

  // function init() {
  // var storedEventTimeList = JSON.parse(localStorage.getItem("eventTimes"));

  // if(storedEventTimeList !== null){
  //   EventTimeList = storedEventTimeList;
  // }
  // renderEventTimes();
  // }

  // init();

  function renderEventTimes() {
    // console.log($(".hour").text());
    // var thisHour = $("#");
    // if($("#9-AM").text());

    for (let i = 0; i < hoursArray.length; i++) {
      var thisHour = moment(hoursArray[i], "hA");
      console.log(thisHour);
      var textArea = $("#" + hoursArray[i]);
      // hoursArray[i];
      if (thisHour.isBefore(hourNow)) {
        textArea.addClass("past");
      } else if (thisHour.isSame(hourNow)) {
        textArea.addClass("present");
      } else if (thisHour.isAfter(hourNow)) {
        textArea.addClass("future");
      }
    }
  }

  renderEventTimes();
});
