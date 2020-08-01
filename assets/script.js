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

  var timeEventList = []; // holds objects; pairs of events and times

  function init() {
    var storedEventTimeList = JSON.parse(localStorage.getItem("eventTimes"));

    // console.log;
    if (storedEventTimeList !== null) {
      timeEventList = storedEventTimeList;
      // storage not empty, going to print at least one stored event
      renderEventTimes();
      printStoredEvents();
    } else {
      // storage empty
      //just print colors
      renderEventTimes();
      // var newTimeEventPair = {
      //   event: "0",
      //   hour: "0",
      // };
      // timeEventList.push(newTimeEventPair);
      // console.log(
      //   timeEventList[0] + "inside init with an null array initialization"
      // );
    }
    // console.log(
    //   "this is the init function console log of timeEventList[0]: " +
    //     timeEventList[0].event +
    //     " and... " +
    //     timeEventList[0].hour
    // );
  }

  init();

  function renderEventTimes() {
    // console.log($(".hour").text());
    // var thisHour = $("#");
    // if($("#9-AM").text());

    for (let i = 0; i < hoursArray.length; i++) {
      var thisHour = moment(hoursArray[i], "hA");
      console.log(thisHour);
      var textArea = $("#" + hoursArray[i]);
      // check if we have previous events, and populate them

      console.log(timeEventList + " ...inside renderEventTimes()");

      console.log(textArea.attr("id") + "...this is the first id of rendering");
      // if (timeEventList !== null) {
      //   if (textArea.attr("id") == timeEventList[i].hour) {
      //     textArea.val() = timeEventList[i].event;
      //   }
      // }

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

  function printStoredEvents() {
    //code here
    for (var i = 0; i < timeEventList.length; i++) {
      var tempHour = timeEventList[i].hour;
      var tempEvent = timeEventList[i].event;
      var newTextArea;

      for (var j = 0; j < hoursArray.length; j++) {
        if (tempHour === hoursArray[j]) {
          newTextArea = $("#" + hoursArray[j]);
          newTextArea.val(tempEvent);
        }
      }
    }
  }

  // click save button event
  $("button").on("click", function (e) {
    e.preventDefault();
    var newEvent = $(this).prev().val();
    console.log("click function: " + newEvent);
    var hourID = $(this).prev().attr("id");
    console.log(hourID);
    // saves event and time into local variable

    // begin storage, create new event object
    var newTimeEventPair = {
      event: newEvent,
      hour: hourID,
    };

    console.log(
      "this is the newly created timeEventPair upon CLICK: " +
        newTimeEventPair.event +
        "and " +
        newTimeEventPair.hour
    );
    timeEventList.push(newTimeEventPair);
    // store the scores
    localStorage.setItem("eventTimes", JSON.stringify(timeEventList));
    // renderEventTimes();
  });
  // press enter after writing event
  // $("textarea").on("submit", function (e) {
  //   e.preventDefault();
  //   var newEvent = $(this).val();
  //   console.log("submit function: " + newEvent);
  // });

  // renderEventTimes();
});
