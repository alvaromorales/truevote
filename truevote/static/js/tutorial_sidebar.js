var current = null;
var previous = null;
var allRaces = [];
var sidebarState = [];

//This is the value because the status bar is 
//updated twice before the user begins entering information,
//And race number should be 0 when the user begins.
//Each call to update the status increase race number by 1.

$(document).ready(function() {
    //introJs().start();
    //console.log("started");
    $('#startTutorial').modal('show');
    $('.close').click(function () {
          parent.location="../audit/"
      });

    var options = {
          stopOnBackdropClick:false,
          stopOnEsc: false,
            nextButton : '<button id="nextButton" class="btn btn-primary btn-mini btn-info bootstro-next-btn">Next &raquo;</button>',
            prevButton : '<button class="btn btn-primary btn-mini btn-info bootstro-prev-btn">&laquo; Previous</button>',
            finishButton : '<a href="/audit/">Finish Tutorial</a>'};
    $("#tutorialSubmit").click(function(){
      
      bootstro.start($(".initialTutorial"), options);
      $('#startTutorial').modal('hide');
    });
    
	  createSidebar();
    $('#helpMenu').hide();
    //introJs().start();
    //console.log("started");

});

var createSidebar = function(){
  $('#enteredInfo').html('');
  $('#enteredInfo').append("<table id='currentBallot'></table>");
  

  allRaces = audit.getCurrentBallot().races;
  
  var currentBallot = $('#currentBallot');
  currentBallot.html('');

  //for (var i = 0; i < 3; i++){
  		
        //var race = allRaces[i].name;
        currentBallot.append('<tr><td class=\'raceName\'>' + "Race 1" + '</td></tr>');
        currentBallot.append('<tr><td class=\'candidateName\'>' + 'Candidate A' + '</td></tr>');
        currentBallot.append('<tr><td class=\'raceName\'>' + "Race 2" + '</td></tr>');
        currentBallot.append('<tr><td class=\'candidateName\'>' + 'Candidate B' + '</td></tr>');
        currentBallot.append('<tr><td class=\'raceName\'>' + "Race 3" + '</td></tr>');
        currentBallot.append('<tr><td class=\'candidateName\'>' + 'Candidate A' + '</td></tr>');
        //currentBallot.append('<tr><td id=\'race' + i + 'winner\' class=\'candidateName\'></td></tr>');
        //currentBallot.append('<tr><td class=\'raceSeparator\'></td></tr>');
  //}
	$('#enteredInfo').animate({scrollTop:$('#enteredInfo')[0].scrollHeight},500);
  //$('#fixMistakeBtn').show();
  //$('#fixMistakeBtn').attr('disabled','disabled');

  

	// Click functionality for fix mistake button
  $("#fixMistakeBtn").click(function(e) {
    parent.location='fix/';
  });

  
}

var restoreSidebar = function(){

  if ((audit.currentBallot == 0 && audit.getCurrentBallot().currentRace == 1)) {
    $('#fixMistakeBtn').attr('disabled','disabled');
  }

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
  bootstro.next();
/*
  // update ballot number and progress bar
  $('#ballotNumber').html('<p>Ballot ' + (audit.currentBallot + 1) + '</p>');
  $('.bar').css('width', (audit.currentRaceNumber/audit.totalNumRaces)*100+ '%');

  var raceNumber = audit.racesMap[raceObject.name];
  if (raceNumber==0 && audit.currentBallot != 0) {
    $('.candidaName').html('');
    sidebarState = [];
  }
  $('#race' + raceNumber + 'winner').html(raceObject.winner.name);
  sidebarState.push(raceObject.winner.name);*/
}

/*var exitErrorMode = function() {
  $('#helpMenu').hide();
  $('#enteredInfo').html('');
  $('#fixMistakeBtn').show();
  $('#btnRestart').hide();
  $('#cancelFixMistake').hide();

  $('#enteredInfo').css('margin-left','2em');

  restoreSidebar();
  displayVoteCountButtons(audit.getCurrentBallot().getPreviousRace());
}

var enterErrorMode = function() {
  $('#helpMenu').show();
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
  if (previousBallotObj && !(audit.currentBallot == 1 && audit.getCurrentBallot().currentRace == 1)) {
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
    resetBallotModal(type);
  });

  $('#enteredInfo').css('margin-left','0em');

}

var displayHelp = function() {
  var buttonsDiv = $('.countButtons');
  buttonsDiv.html(''); //clear buttons

  // SHOW STUFF
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

    //bootbox.dialog("<p>You are about to restart from \"" + raceName + "\" on the " + ballotName + " ballot.</p><p>You will have to re-enter all information after that.</p>", [
    bootbox.dialog("<div class=\"well\"><h3 style=\"font-family: 'Georgia'; font-weight:bold; color: #5F0000;line-height:1.5em;\">You are about to restart from \"" + raceName + "\" on the " + ballotName + " ballot.</h3><h4 style=\"font-family:'Georgia', serif; font-weight:normal;\">You will have to re-enter all information after that. Would you like to continue?</h4></div>", [
      {
              "label" : "Cancel",
              "class" : "btn btnCancelModal",
              "callback": function() {

              }
      },
    {
        "label" : "Continue",
        "class" : "btn btn-danger",
        "callback": function() {
          audit.getCurrentBallot().currentRace = raceNumber;
          updateButtons();

          sidebarState = sidebarState.slice(0,raceNumber);
          exitErrorMode();

          audit.currentRaceNumber = (audit.currentBallot)*allRaces.length + raceNumber;
          $('#ballotNumber').html('<p>Ballot ' + (audit.currentBallot + 1) + '</p>');
          $('.bar').css('width', (audit.currentRaceNumber/audit.totalNumRaces)*100+ '%');
        }
    }, ]);
}

var restartAudit = function (){
    var confirmationDialog = $('#confirmationDialog');
    $("#errorTitle").text("Restart Entire Audit");
    $('#errorBody').html("<div class=\"well\"><h3 style=\"font-family: 'Georgia'; font-weight:normal;\">You are about to restart the entire audit. Would you like to continue?</h3></div>");

    $("#continueButton").click(function(){
      location.reload();
    });
    $("#cancelButton").click(function(){
      confirmationDialog.modal('hide');
    });
    confirmationDialog.modal({show: true});
}

var resetBallotModal = function (type){
    var confirmationDialog = $('#confirmationDialog');
    $("#errorTitle").text("Reset Ballot");
    $('#errorBody').html("<div class=\"well\"><h3 style=\"font-family: 'Georgia'; font-weight:normal;\">You are about to reset this ballot. Would you like to continue?</h3></div>");

    $("#continueButton").click(function(){
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

        if (audit.currentRaceNumber == 1) {
          audit.currentRaceNumber = 0;
        }

        $('#ballotNumber').html('<p>Ballot ' + (audit.currentBallot + 1) + '</p>');
        $('.bar').css('width', (audit.currentRaceNumber/audit.totalNumRaces)*100+ '%');
        confirmationDialog.modal('hide');
    });

    $("#cancelButton").click(function(){
      confirmationDialog.modal('hide');
    });
    confirmationDialog.modal({show: true});
}*/