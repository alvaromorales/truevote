$(function() {
	updateButtons();
});

var updateButtons = function(winner) {
	// SET RESULTS OF PREVIOUS RACE
	if (winner) {
		var previousRace = audit.getCurrentBallot().getPreviousRace();
		previousRace.setWinner(winner);
		//console.log(previousRace); //PRINT OUT RESULTS OF PREVIOUS RACE
	}

	var buttonsDiv = $('.countButtons');
	buttonsDiv.html(''); //clear buttons

	var race = audit.getNextRace();
	if (race) {
		var candidates = race.candidates;
		buttonsDiv.append("<h3>Ballot: " + (audit.currentBallot+1) + "</h3>");
		buttonsDiv.append("<h1>" + race.name + "</h1>");
		buttonsDiv.append("<p><br /></p>");

		for (var i=0;i<candidates.length;i++) {
			var c = candidates[i];
			buttonsDiv.append("<p><input type='button' class='raceBtn btn btn-primary' value='" + c.name + "'></input></p>");
		}

		buttonsDiv.append("<p><input type='button' class='raceBtn btn btn-primary' value='Blank'></input></p>");
		buttonsDiv.append("<p><input type='button' class='raceBtn btn btn-primary' value='Write-In'></input></p>");

		$('.raceBtn').click(function(e) {
			var winner = e.target.value;
			addCandidate(winner, race);
			updateButtons(winner);
		});
	}

};