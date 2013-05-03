var race;

$(function() {
	getData();
});

var getData = function() {
	$.getJSON('/candidates/', loadData);
}

var loadData = function(data) {
	console.log(data);
	loadCandidates(data);
	loadSidebar(data);
}

var loadCandidates = function(data) {
	var currentRace = data.currentRace;

	var raceName = currentRace.name;
	var candidatesArray = currentRace.candidates;
	var candidates = [];

	for (var i=0;i<candidatesArray.length;i++) {
		c = candidatesArray[i];
		candidates.push(new Candidate(c.name,c.party));
	}

	race = new Race(raceName,candidates);

	if (data.currentRaceNum == 0 && data.currentBallotNum != 0) {
		displayTransition();
	} else {
		displayVoteCountButtons();
	}
}

var loadSidebar = function(data) {
	var previousRaces = data.previousRaces;
	var currentRace = data.currentRace;
	
	var currentBallotNum = data.currentBallotNum;
	var numBallots = data.numBallots;
	var currentRaceNum = data.currentRaceNum;
	var numRaces = data.numRaces;
	
	var height = $(window).height();
	$("#enteredInfo").css("height", height-120);
	$(window).resize(function(){
	var height = $(window).height();
	$("#enteredInfo").css("height", height-120);
	});
	// update ballot number and progress bar
	$('#ballotNumber').html('<p>Ballot ' + (currentBallotNum + 1) + '/' + (numBallots) + '</p>');
	$('#ballotHelper').html('<p>Audit ' + (((currentBallotNum + 1)*(currentRaceNum))/(numBallots*numRaces))*100 + '% completed. </p>');
	$('.bar').css('width', (((currentBallotNum + 1)*(currentRaceNum))/(numBallots*numRaces))*100+ '%');
	
	$('#enteredInfo').html('');
	$('#enteredInfo').append("<table id='currentBallot'></table>");
	var currentBallot = $('#currentBallot');

	for (var i = 0; i < 3; i++){
		if (data.currentRaceNum == 0 && data.currentBallotNum != 0){
			currentBallot.append('<tr><td class=\'raceName\'>' + '</td></tr>');
			currentBallot.append('<tr><td id=\'race' + 'winner\' class=\'candidateName\'></td></tr>');
			currentBallot.append('<tr><td class=\'raceSeparator\'></td></tr>');
		}
		else if (previousRaces[i] != null){
			var name = previousRaces[i].name;
			var winner = previousRaces[i].winner;
			currentBallot.append('<tr><td class=\'raceName\'>' + name + '</td></tr>');
			currentBallot.append('<tr><td id=\'race' + winner + 'winner\' class=\'candidateName\'>' + winner + '</td></tr>');
			currentBallot.append('<tr><td class=\'raceSeparator\'></td></tr>');
		}
	}
	if (data.currentRaceNum == 0 && data.currentBallotNum != 0){
		currentBallot.append('<tr><td class=\'raceName\'>' + '</td></tr>');
		currentBallot.append('<tr><td id=\'race' + 'winner\' class=\'candidateName\'></td></tr>');
		currentBallot.append('<tr><td class=\'raceSeparator\'></td></tr>');
	}
	else{
		currentBallot.append('<tr><td class=\'raceName\'>' + currentRace.name + '</td></tr>');
		currentBallot.append('<tr><td id=\'race' + '' + 'winner\' class=\'candidateName\'></td></tr>');
		currentBallot.append('<tr><td class=\'raceSeparator\'></td></tr>');
	}


	$('#fixMistakeBtn').show();
	$('#fixMistakeBtn').attr('disabled','disabled');

	$('#btnRestart').hide();
	$('#cancelFixMistake').hide();
	
	
}

var displayTransition = function() {
	var buttonsDiv = $('.countButtons');
	buttonsDiv.html(''); //clear buttons

	var transitionText = $("<h2>You are done with this ballot. Please get the next ballot ready.</h2>");
	transitionText.css('font-family','\'Istok Web\', sans-serif');
	transitionText.css('color','#5F0000');
	transitionText.css('font-weight','bold');
	transitionText.css('position','absolute');
	transitionText.css('top','42.5%');
	transitionText.css('right','22.75%');
	transitionText.css('word-wrap','break-word');
	transitionText.css('width','40%');
	transitionText.css('text-align','center');

	buttonsDiv.append(transitionText);

	var nextBtn = $("<input type='button' class='raceBtn btn btn-info' value='Next'></input>");
	nextBtn.css('position','absolute');
	nextBtn.css('height','20%');
	nextBtn.css('width','32.5%');
	nextBtn.css('left','47.5%');
	nextBtn.css('bottom','20%');
	nextBtn.addClass('btn-info-top');

	nextBtn.click(function(e) {
		displayVoteCountButtons();
	});

	buttonsDiv.append(nextBtn);
}

var displayVoteCountButtons = function() {
	var buttonsDiv = $('.countButtons');
	var width = $(window).width();
	buttonsDiv.css("width", width-300);
	console.log(width-300);
	buttonsDiv.html(''); //clear buttons

	if (race) {
		var candidates = race.candidates;
		var raceName = $("<h1>" + race.name + "</h1>");
		raceName.css('font-family','\'Istok Web\', sans-serif');
		raceName.css('color','#5F0000');
		raceName.css('font-weight','bold');
		raceName.css('position','absolute');
		raceName.css('top','42.5%');
		raceName.css('right','22.75%');
		raceName.css('word-wrap','break-word');
		raceName.css('width','28%');
		raceName.css('text-align','center');

		buttonsDiv.append(raceName);

		var numOther = 0;
		for (var i = 0;i<candidates.length;i++) {
			if (candidates[i].party != "Republican Party" && candidates[i].party != "Democratic Party") {
				numOther++;
			}
		}
		var currentOther = 0;


		for (var i=0;i<candidates.length;i++) {
			var c = candidates[i];
			var candidate = $("<input type='button' class='raceBtn btn btn-info' value='" + c.name + "'></input>");
			candidate.css('position','absolute');
			if (c.party == "Republican Party") {
				candidate.css('height','20%');
				candidate.css('width','32.5%');
				candidate.css('left','47.5%');
				candidate.css('bottom','5%');
				candidate.addClass('btn-info-top');
			} else if (c.party == "Democratic Party") {
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
			var buttonsDiv = $('.countButtons');
			var winner = e.target.value;

			$.getJSON('vote', {"race_name": race.name,"winner": winner},loadData);
		});
	}
}