$(function() {
	updateButtons();
});

<<<<<<< HEAD
var updateButtons = function(isRestore) {
	var buttonsDiv = $('.countButtons');
	buttonsDiv.html(''); //clear buttons

	if (!isRestore) {
		var race = audit.getNextRace();
	} else {
		var race = audit.getCurrentBallot().getCurrentRace();
	}

=======
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
	buttonsDiv.html(''); //clear buttons

>>>>>>> feature/sidebar
	if (race) {
		var candidates = race.candidates;
		var candidateName = $("<h1>" + race.name + "</h1>");
		candidateName.css('font-family','\'Istok Web\', sans-serif');
<<<<<<< HEAD
		candidateName.css('color','#6F0000');
=======
		candidateName.css('color','#5F0000');
>>>>>>> feature/sidebar
		candidateName.css('font-weight','bold');
		candidateName.css('position','absolute');
		candidateName.css('top','42.5%');
		candidateName.css('right','22.75%');
		candidateName.css('word-wrap','break-word');
		candidateName.css('width','28%');
		candidateName.css('text-align','center');

		buttonsDiv.append(candidateName);

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
				candidate.css('height','20%');
				candidate.css('width','32.5%');
				candidate.css('left','47.5%');
				candidate.css('bottom','5%');
				candidate.addClass('btn-info-top');
			} else if (c.party == democraticParty) {
				candidate.css('top','5%');
				candidate.css('height','20%');
				candidate.css('width','32.5%');
				candidate.css('left','47.5%');
				candidate.addClass('btn-info-top');
			} else {
				candidate.css('top',(15 + currentOther*(70.0/numOther + 2.5*(numOther-1))) +'%');
				candidate.css('width','15%');
				candidate.css('right','55%');

				var height = Math.min((70.0/numOther - 2.5*(numOther-1)),32.5);
				candidate.css('height', height + '%');
				currentOther++;
			}
			buttonsDiv.append(candidate);
		}
		var blank = $("<input type='button' class='raceBtn btn btn-info' value='Blank'></input>");
		blank.css('position','absolute');
		blank.css('right','2.5%');
		blank.css('top', '15%');
		blank.css('width', '15%');
		blank.css('height', '32.5%');
		buttonsDiv.append(blank);

		var writeIn = $("<input type='button' class='raceBtn btn btn-info' value='Write-In'></input>");
		writeIn.css('position','absolute');
		writeIn.css('right','2.5%');
		writeIn.css('top', '52.5%');
		writeIn.css('width', '15%');
		writeIn.css('height', '32.5%');
		buttonsDiv.append(writeIn);

		$('.raceBtn').click(function(e) {
			var winner = e.target.value;
			
			// SET RESULTS OF PREVIOUS RACE
			if (winner) {
				var previousRace = audit.getCurrentBallot().getPreviousRace();
				previousRace.setWinner(winner);
				updateSidebar(previousRace);
			}
			updateButtons();
		});
	}
}
