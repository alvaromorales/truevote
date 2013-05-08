$(function() {
	var tutorialStep=0;
	updateButtons();
	bootstro.on_step(
          function() {
          	tutorialStep+=1;
          	if (tutorialStep==6){
          		$('#fixMistakeBtn').attr('enabled','enabled');
				
				
          	}}
        );
});

var updateButtons = function() {
	var race = audit.getNextRace();
	displayVoteCountButtons(race);
};

var restoreAuditTo = function(ballotNumber,raceNumber) {
	audit.currentBallot = ballotNumber;
	audit.getCurrentBallot().currentRace = raceNumber;
	var race = audit.getCurrentBallot().getCurrentRace();
	displayVoteCountButtons(race);
}

var displayVoteCountButtons = function(race) {
	var buttonsDiv = $('.countButtons');
	

	var width = $(window).width();
	buttonsDiv.css("width", width-300);
	buttonsDiv.html(''); //clear buttons

	if (race) {
		var candidates = race.candidates;
		var raceName = $("<h1>" + race.name + "</h1>");
		raceName.css('position','absolute');
		raceName.css('top','42.5%');
		raceName.css('right','29%');
		raceName.css('word-wrap','break-word');
		raceName.css('width','45%');
		raceName.css('text-align','center');

		buttonsDiv.append(raceName);

		var numOther = 0;
		for (var i = 0;i<candidates.length;i++) {
			if (candidates[i].party != republicanParty && candidates[i].party != democraticParty) {
				numOther++;
			}
		}
		var currentOther = 0;


		for (var i=0;i<candidates.length;i++) {
			var c = candidates[i];
			var candidate = $("<input type='button' class='raceBtn btn btn-info' value='" + c.name + "'></input>");
			candidate.css('position','absolute');
			if (c.party == republicanParty) {
				candidate = $("<input type='button' class='raceBtn btn btn-info bootstro initialTutorial' data-bootstro-step='2' data-bootstro-content='The Republican candidate will always appear on the bottom.' data-bootsro-title='Welcome to TrueVote!' data-bootstro-placement='top' value='" + c.name + "'></input>");
				candidate.css('height','20%');
				candidate.css('width','43%');
				candidate.css('left','27%');
				candidate.css('bottom','5%');
				candidate.css('position','absolute');
				candidate.addClass('btn-info-top');
			} else if (c.party == democraticParty) {
				candidate = $("<input type='button' class='raceBtn btn btn-info bootstro initialTutorial' data-bootstro-step='1' data-bootstro-content='The Democratic candidate will always appear on the top.' data-bootsro-title='Welcome to TrueVote!' data-bootstro-placement='bottom' value='" + c.name + "'></input>");
				candidate.css('top','5%');
				candidate.css('height','20%');
				candidate.css('width','43%');
				candidate.css('left','27%');
				candidate.css('position','absolute');
				candidate.addClass('btn-info-top');
			} else {
				candidate.css('top',(15 + currentOther*(70.0/numOther + 2.5*(numOther-1))) +'%');
				candidate.css('width','20%');
				candidate.css('left','3.5%');

				var height = Math.min((70.0/numOther - 2.5*(numOther-1)),32.5);
				candidate.css('height', height + '%');
				currentOther++;
			}
			buttonsDiv.append(candidate);
		}
		var blankWriteInDiv = $("<div class='bootstro initialTutorial' data-bootstro-step='3' data-bootsro-title='Welcome to TrueVote!' data-bootstro-placement='left' data-bootstro-content='The buttons for blank and write-in will always appear on the right.'></div>")
		blankWriteInDiv.css('position','absolute');
		blankWriteInDiv.css('right','6.5%');
		blankWriteInDiv.css('top', '15%');
		blankWriteInDiv.css('width', '20%');
		blankWriteInDiv.css('height', '75%');
		buttonsDiv.append(blankWriteInDiv);

		var blank = $("<input type='button' class='raceBtn btn btn-info' value='Blank'></input>");
		blank.css('position','absolute');
		blank.css('right','0%');
		blank.css('top', '0%');
		blank.css('width', '100%');
		blank.css('height', '43.3%');
		blankWriteInDiv.append(blank);

		var writeIn = $("<input type='button' class='raceBtn btn btn-info' value='Write-In'></input>");
		writeIn.css('position','absolute');
		writeIn.css('right','0%');
		writeIn.css('top', '56.67%');
		writeIn.css('width', '100%');
		writeIn.css('height', '43.3%');
		blankWriteInDiv.append(writeIn);

		

		$('.raceBtn').click(function(e) {
			var winner = e.target.value;
			
			// SET RESULTS OF PREVIOUS RACE
			if (winner) {
				var previousRace = audit.getCurrentBallot().getPreviousRace();
				previousRace.setWinner(winner);
				updateSidebar(previousRace);
			}
			//updateButtons();
		});
	}
}