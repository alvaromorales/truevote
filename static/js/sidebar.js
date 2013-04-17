var current = null;
var previous = null;
var allRaces = [];
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
	
  $('#fixMistakeBtn').show();
  $('#btnRestart').hide();
  $('#cancelFixMistake').hide();

	// Click functionality for fix mistake button
  $("#fixMistakeBtn").click(function(){
    enterErrorMode();
  });

  $('#cancelFixMistake').click(function(e) {
    exitErrorMode();
  });

  $('#btnRestart').click(function(e) {
    restartAudit();
  });
}

var restoreSidebar = function(){
  $('#enteredInfo').append("<table id='currentBallot'></table>");
  allRaces = audit.getCurrentBallot().races;  
  var currentBallot = $('#currentBallot');

  for (var i = 0; i < allRaces.length; i++){
        var race = allRaces[i].name;
        currentBallot.append('<tr><td class=\'raceName\'>' + race + '</td></tr>');

        if (sidebarState[i]){
          currentBallot.append('<tr><td id=\'race' + i + 'winner\' class=\'candidateName\'>' + sidebarState[i] +'</td></tr>');
        } else {
          currentBallot.append('<tr><td id=\'race' + i + 'winner\' class=\'candidateName\'></td></tr>');
        }
        currentBallot.append('<tr><td class=\'raceSeparator\'></td></tr>');
  }
}

//Candidate is entered and is added to sidebar
var updateSidebar = function(raceObject){
  // update ballot number and progress bar
  $('#ballotNumber').html('<p>Ballot ' + (audit.currentBallot + 1) + '</p>');
  // $('#counter').html("<progress value=\""+audit.currentRaceNumber+"\" max=\""+audit.totalNumRaces+"\"><\/progress>");
  $('#counter').html("<div class=\"bar\" style=\"width: "+ (audit.currentRaceNumber*100/audit.totalNumRaces)+"%;\"></div>");

  var raceNumber = audit.racesMap[raceObject.name];
  if (raceNumber==0 && audit.currentBallot != 0) {
    $('.candidateName').html('');
    sidebarState = [];
  }
  $('#race' + raceNumber + 'winner').html(raceObject.winner.name);
  sidebarState.push(raceObject.winner.name);
}

var exitErrorMode = function() {
  $('#enteredInfo').html('');
  $('#fixMistakeBtn').show();
  $('#btnRestart').hide();
  $('#cancelFixMistake').hide();

  $('#enteredInfo').css('margin-left','2em');

  restoreSidebar();
  displayVoteCountButtons(audit.getCurrentBallot().getPreviousRace());
}

var enterErrorMode = function() {
  displayHelp();

  // display buttons
  $('#fixMistakeBtn').hide();
  $('#btnRestart').show();
  $('#cancelFixMistake').show();

  // clear sidebar
  $('#enteredInfo').html('');
  $('#enteredInfo').html("<div id='accordion'></div>");

  var accordion = $('#accordion');

  //Add current ballot header
  accordion.append("<h3>Current Ballot &nbsp;&nbsp;&nbsp;<span class='btn-group'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-danger resetBallot pull-right' value='current'>Reset</button></span></h3><div id='currentBallotAccordion'></div>");

  // Show entered fields for current ballot
    $('#currentBallotAccordion').append("<table id='currentBallot'></table>");

  displayFixCurrentBallot();

  // Show entered fields for previous ballot
  var previousBallotObj = audit.getPreviousBallot();
  if (previousBallotObj && !(audit.currentBallot == 1 && audit.getCurrentBallot.currentRace == 0)) {
    //Add previous ballot header
    accordion.append("<h3>Previous Ballot &nbsp;&nbsp;&nbsp;<span class='btn-group'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-danger pull-right' value='previous'>Reset</button></span></h3><div id='previousBallotAccordion'></div>");
    $('#previousBallotAccordion').html("<table id=previousBallot></table>");
    displayFixPreviousBallot(previousBallotObj);
    $("#accordion").accordion({autoHeight: false, collapsible: true});    
  } else {
    $("#accordion").accordion({autoHeight: false, collapsible: false});    
    // no previous ballot. cover whole height
  }

  $('.resetBallot').click(function(e) {
    var type = e.target.value;

    if (type == "current") {
      audit.getCurrentBallot().currentRace = 0;
      updateButtons();
      sidebarState = [];
      exitErrorMode();
    } else {
      audit.currentBallot--;
      audit.getCurrentBallot().currentRace = 0;
      updateButtons();
      sidebarState = [];
      exitErrorMode();
    }
    audit.currentRaceNumber = (audit.currentBallot)*allRaces.length + audit.getCurrentBallot().currentRace;
    $('#ballotNumber').html('<p>Ballot ' + (audit.currentBallot + 1) + '</p>');
    $('#counter').html("<progress value=\""+audit.currentRaceNumber+"\" max=\""+audit.totalNumRaces+"\"><\/progress>");
  });
  $('#enteredInfo').css('margin-left','0em');

}

var displayHelp = function() {
  var buttonsDiv = $('.countButtons');
  buttonsDiv.html('');

  buttonsDiv.append("<table id='errorInstructions' class='span9'></table>");
  errorTable = $('#errorInstructions');

  //Add each of the four instructions individually
  errorTable.append('<h2 class="span12" id=\'errorInstructionTitle\'>Instructions</h2>');
  errorTable.append('<tr><td class=\"span2\"></td><td class=\"eICell span4\"><img src=\"/static/img/testImage.png\" alt=\"ScreenShot\"></td><td class=\"eICell span3\"><p>To fix a specific race, click on the candidate’s name.</p></td><td class=\"span3\"></td></tr>');
  errorTable.append('<tr><td class=\"span2\"></td><td class=\"eICell span4\"><img src=\"/static/img/testImage.png\" alt=\"ScreenShot\"></td><td class=\"eICell span3\"><p>To reset a whole ballot, click the \“Reset\” button at the top of the ballot. You can only reset your current ballot and the one immediately preceding it.</p></td><td class=\"span3\"></td></tr>')
  errorTable.append('<tr><td class=\"span2\"></td><td class=\"eICell span4\"><img src=\"/static/img/testImage.png\" alt=\"ScreenShot\"></td><td class=\"eICell span3\"><p>To restart the entire audit, click the \“Restart Audit button\” at the bottom left of your screen.</p></td><td class=\"span3\"></td></tr>');
  errorTable.append('<tr><td class=\"span2\"></td><td class=\"eICell span4\"><img src=\"/static/img/testImage.png\" alt=\"ScreenShot\"></td><td class=\"eICell span3\"><p>To continue entering ballots without making any changes, click the \“Cancel\” button at the bottom left of your screen.</p></td><td class=\"span3\"></td></tr>');

}

var displayFixCurrentBallot = function() {
  var currentBallot = $('#currentBallot');

  for (var i=0;i<sidebarState.length;i++) {
    currentBallot.append('<tr><td class=\'raceName\'>' + audit.getCurrentBallot().races[i].name + '</td></tr>');
    currentBallot.append('<tr><td><button style=\'border-radius: 3px; height=:1.3em; margin-top:0.5em;\' class=\'fixCurrent btn btn-info  input-large\' value=\'' + i + '\'>' + sidebarState[i] + '</button></td></tr>');
    currentBallot.append('<tr><td class=\'raceSeparator\'></td></tr>');
  }

  $('.fixCurrent').click(function(e) {
    fixFromRace(parseInt(e.target.value),true);
  });
}

var displayFixPreviousBallot  = function(previousBallotObj) {
  var previousBallot = $('#previousBallot');

  for (var i = 0; i < previousBallotObj.races.length; i++){
        var race = previousBallotObj.races[i];
        previousBallot.append('<tr><td class=\'raceName\'>' + race.name + '</td></tr>');
        previousBallot.append('<tr><td><button style=\'border-radius: 3px;\' id=\'previousrace' + i + 'winner\' class=\'fixPrevious btn btn-info input-large\' value=\'' + i + '\'>' + race.winner.name + '</button></td></tr>');
        previousBallot.append('<tr><td class=\'raceSeparator\'></td></tr>');
  }

  // $('.fixPrevious').click(function(e) {
  //   fixFromRace(parseInt(e.target.value),false);
  // });
}

var fixFromRace = function(raceNumber,isCurrent) {
    var raceName = allRaces[raceNumber].name;
    var ballotName;
    if (isCurrent) {
      ballotName = "current";
    } else {
      ballotName = "previous";
    }

    bootbox.dialog("<p>You are about to restart from \"" + raceName + "\" on the " + ballotName + " ballot.</p><p>You will have to re-enter all information after that.</p>", [
      {
              "label" : "Cancel",
              "class" : "btn-danger cancelButton",
              "callback": function() {
              }
      },
    {
        "label" : "Continue",
        "class" : "btn-success continueButton",
        "callback": function() {
          if (!isCurrent) {
            audit.currentBallot--;
          }

          audit.getCurrentBallot().currentRace = raceNumber;
          updateButtons();

          sidebarState = sidebarState.slice(0,raceNumber);
          exitErrorMode();

          audit.currentRaceNumber = (audit.currentBallot)*allRaces.length + raceNumber;
          $('#ballotNumber').html('<p>Ballot ' + (audit.currentBallot + 1) + '</p>');
          $('#counter').html("<progress value=\""+audit.currentRaceNumber+"\" max=\""+audit.totalNumRaces+"\"><\/progress>");
        }
    }, ]);
}

var restartAudit = function (){
	var confirmationDialog = $('#confirmationDialog');
	$("#errorTitle").text("Reset Entire Audit");
	$(continueButton).click(function(){
	location.reload();
	});
	$(cancelButton).click(function(){
	confirmationDialog.modal('hide');
	});
	confirmationDialog.modal({show: true});
	
  bootbox.dialog("<p>You are about to restart the entire audit. Would you like to continue? <br /> </p>", [
  {
        "label" : "Cancel",
        "class" : "btn-danger cancelButton",
        "callback": function() {
        }
  },
  {
      "label" : "Continue",
      "class" : "btn-success continueButton",
      "callback": function() {
        location.reload();
      }
  },
  ]);
}