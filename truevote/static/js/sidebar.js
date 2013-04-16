var current = null;
var previous = null;

//GET THESE FROM AUDIT
totalBallots=audit.numBallots;

$(document).ready(function() {
      //Create progress bar at top
	  createSidebar();
});

function createSidebar(){
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
  			//Turn selections into buttons
  			for (var i = 0; i < allRaces.length; i++){
  			addButtonToSideBar(i);

  			} 
  			addResetButtons();
  		 });
  		 

}

//Adds reset buttons on ballots when error mode is entered
function addResetButtons(){
	var ballot1 = $('#currentBallotresetButtonDiv');
	
	ballot1.innerHTML= "<button id="+'currentBallotresetButton '+ "class='btn-primary errorButton'>"+"Reset Ballot"+"<button>";
    var button1 = $('#currentBallotresetButton');
    $(button1).click(function(){
    	resetCurrentBallot();
    });
    
    var ballot2 = $('#previousBallotresetButtonDiv');
    ballot2.innerHTML= "<button id='previousBallotresetButton' class='btn-primary errorButton'>"+"Reset Ballot"+"<button>";
    var button2 = $('#previousBallotresetButton');
    $(button2).click(function(){
    });
};

function resetCurrentBallot(){
	for (var i = 0; i < allRaces.length; i++){
			var raceName = allRaces[i].name;
      		var raceDiv = $('#1'+raceName+"Entry");
      		raceDiv.innerHTML='';
      		//Reset main
      		//audit.getCurrentBallot().currentRace=0;
            	
      	} 
};

function resetBallotFromRace(ballotNumber, raceName){
	var after = false;
	for (var i = 0; i < allRaces.length; i++){
			var currentRaceName = allRaces[i].name;
            if (raceName == currentRaceName){
            after=true;
            //Make actual audit go back to this race
            };
            if (after){
            	var raceDiv = document.getElementById(ballotNumber+currentRaceName+"Entry");
      			raceDiv.innerHTML='';
            }
      		
      		//Reset main
      		//audit.getCurrentBallot().currentRace=0;
            	
      	}
      	exitErrorMode();
	
};
function exitErrorMode(){

}

function addButtonToSideBar(i){
				var raceName = allRaces[i].name;
            	var oldDiv = $('#2'+raceName+"Entry");
            	var newDiv = $('#1'+raceName+"Entry");

            	if (newDiv.innerHTML!= ""){
            		newDiv.innerHTML = "<button id='1"+raceName+"button' class='btn-primary errorButton'>"+newDiv.innerHTML+"<button>";
           		 	// Add click listener for new buttons
           		 	addClickListener(1, raceName);
            
            	}
           		 if (oldDiv.innerHTML!= ""){

            		oldDiv.innerHTML = "<button id='2"+raceName+"button' class='btn btn-primary errorButton'>"+oldDiv.innerHTML+"<button>";

            		addClickListener(2, raceName);
            	}
	
};

// Adds click listener for given ballot and race name
function addClickListener(ballot, raceName){
 		var id = ballot+raceName+"button";
 		var button = document.getElementById(id);
        $(button).click({ballot: ballot,currentRace: raceName},function(){
            	resetBallotFromRace(ballot, raceName);
            });
};

function updateStatusBar(){
      var bar = $('#counter');
      bar.innerHTML = "<progress value=\""+(audit.currentBallot).toString()+"\" max=\""+totalBallots.toString()+"\"><\/progress>";

      var ballotNum = $('#ballotNumber');
      ballotNum.innerHTML = "<p>Ballot #" + (audit.currentBallot).toString() + "<\/p>";
}

//Candidate is entered and is added to sidebar
function addCandidate(candidateName, raceObject){
      var allRaces = audit.getCurrentBallot().races;
      var raceNumber = allRaces.indexOf(raceObject);
      $('#race' + raceNumber+ 'winner').html(candidateName);
}

//Moves the ballot information down one,
//Current Ballot now doesn't display any information
function newBallot(){
      for (var i = 0; i < allRaces.length; i++){
            var raceName = allRaces[i].name;
            var oldDiv = $('#1'+raceName+"Entry");
            var newDiv = $('#2'+raceName+"Entry");
            newDiv.innerHTML = oldDiv.innerHTML;
            oldDiv.innerHTML = "";
      }  
};

 //Moves the ballot information up one,
//Replaces previous ballot with the one before
var displayPreviousBallot = function displayPreviousBallot(){
        previousBallot = audit.getPreviousBallot();   
      for (var i = 0; i < allRaces.length; i++){
            var raceName = allRaces[i].name;
            var upperDiv = $('#1'+raceName+"Entry");
            var lowerDiv = $('#2'+raceName+"Entry");
            upperDiv.innerHTML = lowerDiv.innerHTML;
            
            //Update previous ballot
            candidateName = previousBallot.getRace(i).winner;
            lowerDiv.innerHTML = "<p>"+candidateName+"<\/p>";
      }  
};

function removeSpaces(val) {
   return val.split(' ').join('');
};