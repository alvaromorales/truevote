var current = null;
var previous = null;
var allRaces = [];
var raceNumber = -2;
var sidebarState = [];

//This is the value because the status bar is 
//updated twice before the user begins entering information,
//And race number should be 0 when the user begins.
//Each call to update the status increase race number by 1.

$(document).ready(function() {
	  createSidebar();
});

var createSidebar = function(){
  $('#enteredInfo').html('');
  $('#enteredInfo').append("<table id='currentBallot'></table>");
  currentBallot = $('#currentBallot');
  

  allRaces = audit.getCurrentBallot().races;
  
  var currentBallot = $('#currentBallot');

  for (var i = 0; i < allRaces.length; i++){
  		
        var race = allRaces[i].name;
        currentBallot.append('<tr><td class=\'raceName\'>' + race + '</td></tr>');
        currentBallot.append('<tr><td id=\'race' + i + 'winner\' class=\'candidateName\'></td></tr>');
        currentBallot.append('<tr><td class=\'raceSeparator\'></td></tr>');
  }
	
	// Click functionality for fix mistake button
  $("#fixMistakeButton").click(function(){
    enterErrorMode();
  });
}

//Candidate is entered and is added to sidebar
var updateSidebar = function(raceObject){
  // update ballot number and progress bar
  $('#ballotNumber').html('<p>Ballot ' + (audit.currentBallot + 1) + '</p>');
  $('#counter').html("<progress value=\""+audit.currentRaceNumber+"\" max=\""+audit.totalNumRaces+"\"><\/progress>");

  var raceNumber = audit.racesMap[raceObject.name];
  if (raceNumber==0 && audit.currentBallot != 0) {
    $('.candidateName').html('');
    sidebarState = [];
  }
  $('#race' + raceNumber + 'winner').html(raceObject.winner.name);
  sidebarState.push(raceObject.winner.name);
}

var exitErrorMode = function() {

}

var enterErrorMode = function() {
  displayHelp();

  // display buttons
  $('#fixMistakeButton').html("<button id='btnRestart' class='btn btn-danger'>Restart Audit</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button id='cancelFixMistake' class='btn'>Cancel</button>");

  // clear sidebar
  $('#enteredInfo').html('');

  //Add current ballot header
  $('#enteredInfo').append("<div id='currentBallotHeader'><h3>Current Ballot &nbsp;&nbsp;&nbsp;<span class='btn-group'><button class='btn btn-danger'>Reset</button></span></h3></div>");

  // Show entered fields for current ballot
  var currentBallotDisplay = $("<div id='currentBallotEntered'></div>");
  currentBallotDisplay.html("<table id=currentBallot></table>");
  currentBallotDisplay.addClass('scrollable');
  $('#enteredInfo').append(currentBallotDisplay);

  displayFixCurrentBallot()

  // Show entered fields for previous ballot
  var previousBallotObj = audit.getPreviousBallot();
  if (previousBallotObj) {
    //Add previous ballot header
    $('#enteredInfo').append("<div id='previousBallotHeader'><h3>Previous Ballot &nbsp;&nbsp;&nbsp;<span class='btn-group'><button class='btn btn-danger'>Reset</button></span></h3></div>");
    $('#previousBallotHeader').css('position','absolute');
    $('#previousBallotHeader').css('top','52.5%');

    var previousBallotDisplay = $("<div id='previousBallotEntered' class='scrollable'></div>");
    previousBallotDisplay.css('top','61%');
    previousBallotDisplay.html("<table id=previousBallot></table>");
    $('#enteredInfo').append(previousBallotDisplay);

    displayFixPreviousBallot(previousBallotObj);
  } else {
    // no previous ballot. cover whole height
    currentBallotDisplay.css('height','65%');
  }

  $('#cancelFixMistake').click(function(e) {
    exitErrorMode();
  });
  $('#btnRestart').click(function(e) {
  	restartAudit();
    exitErrorMode();
  });
}

var displayHelp = function() {
  var buttonsDiv = $('.countButtons');
  buttonsDiv.html(''); //clear buttons

  // SHOW STUFF
}

var displayFixCurrentBallot = function() {
  var currentBallot = $('#currentBallot');
  currentBallot.css('margin-top','0%');
  for (var i=0;i<sidebarState.length;i++) {
    currentBallot.append('<tr><td class=\'raceName\'>' + audit.getCurrentBallot().races[i].name + '</td></tr>');
    currentBallot.append('<tr><td><button class=\'btn btn-danger fixCurrent\' value=\'' + i + '\'>' + sidebarState[i] + '</button></td></tr>');
    currentBallot.append('<tr><td class=\'raceSeparator\'></td></tr>');
  }
}

var displayFixPreviousBallot  = function(previousBallotObj) {
  var previousBallot = $('#previousBallot');

  for (var i = 0; i < previousBallotObj.races.length; i++){
        var race = previousBallotObj.races[i];
        previousBallot.append('<tr><td class=\'raceName\'>' + race.name + '</td></tr>');
        previousBallot.append('<tr><td><button id=\'previousrace' + i + 'winner\' class=\'btn btn-danger fixPrevious\' value=\'' + i + '\'>' + race.winner.name + '</button></td></tr>');
        previousBallot.append('<tr><td class=\'raceSeparator\'></td></tr>');
  }
}

var restartAudit = function (){
	var confirmationDialog = $('#confirmationDialog');
	$("#errorTitle").text("Reset Entire Audit");
	$("#errorBody").html("<p> You are about to restart the entire audit. Would you like to continue? <\/p>");
	$(continueButton).click(function(){
	location.reload();
	});
	$(cancelButton).click(function(){
	confirmationDialog.modal('hide');
	});
	confirmationDialog.modal({show: true});
	
}