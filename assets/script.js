$(document).ready(function () {
  // grab current time in this format
  var now = moment().format("dddd MMMM Do YYYY, h:mm:ss A");
  var hourNow = moment().format("hA");
  // hourNow = moment("3PM", "hA"); // THIS IS JUST A DEFAULT TEST TIME
  hourNow = moment(hourNow, "hA");
  // THIS TO GET REAL TIME, xAM format
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
  var currentDayDisplay = $("#currentDay");
  currentDayDisplay.text(now);
  var timeEventList = []; // holds objects; pairs of events and times

  function init() {
    // retrieve local storage
    var storedEventTimeList = JSON.parse(localStorage.getItem("eventTimes"));
    if (storedEventTimeList !== null) {
      timeEventList = storedEventTimeList;
      // storage not empty, going to print at least one stored event
      renderEventTimes();
      printStoredEvents();
    } else {
      // storage empty
      //just print colors
      renderEventTimes();
    }
  }
  // initialize the application upon load
  init();

  // uses moment.js functions to compare times
  function renderEventTimes() {
    // loop through each hour
    for (let i = 0; i < hoursArray.length; i++) {
      var thisHour = moment(hoursArray[i], "hA");
      console.log(thisHour);
      var textArea = $("#" + hoursArray[i]);
      // add class/color depending on the time
      if (thisHour.isBefore(hourNow)) {
        textArea.addClass("past");
      } else if (thisHour.isSame(hourNow)) {
        textArea.addClass("present");
      } else if (thisHour.isAfter(hourNow)) {
        textArea.addClass("future");
      }
    }
  }

  // renders current stored events
  function printStoredEvents() {
    // loop through both arrays!
    // for each time/event pair,
    // check against each hour for match
    for (var i = 0; i < timeEventList.length; i++) {
      // store object properties for each
      var tempHour = timeEventList[i].hour;
      var tempEvent = timeEventList[i].event;
      // var newTextArea;
      for (var j = 0; j < hoursArray.length; j++) {
        if (tempHour === hoursArray[j]) {
          var newTextArea = $("#" + hoursArray[j]);
          newTextArea.val(tempEvent);
        }
      }
    }
  }

  // click any save button event
  $(".saveBtn").on("click", function (e) {
    e.preventDefault();
    var newEvent = $(this).prev().val().trim();
    var hourID = $(this).prev().attr("id");
    // saves event and time into local variable

    // begin storage, create new event object
    var newTimeEventPair = {
      event: newEvent,
      hour: hourID,
    };
    // push new pair into the array
    timeEventList.push(newTimeEventPair);
    // store the scores
    localStorage.setItem("eventTimes", JSON.stringify(timeEventList));
  });

  // this scrap function clears local storage and events
  $(".scrapBtn").on("click", function (e) {
    e.preventDefault();
    localStorage.clear();
    timeEventList = [];
    $("textarea").val("");
  });
});
