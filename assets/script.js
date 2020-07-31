$(document).ready(function () {
  var now = moment().format("dddd MMMM Do YYYY, h:mm:ss a");
  console.log(now);
  var currentDayDisplay = $("#currentDay");
  currentDayDisplay.text(now);
});
