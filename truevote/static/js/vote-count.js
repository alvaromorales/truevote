/*
 * Represents a candidate
 * @param name: the candidate's name
 * @param party: the name of the candidate's party
 */
var Candidate = function(name,party) {
	this.name = name;
	this.party = party;
};

/* 
 * Represents a race
 * @param name: the race name
 * @param candidates: an array of Candidate objects
 */
var Race = function(name,candidates) {
	this.name = name;
	this.candidates = candidates;

	this.candidatesMap = {};

	for (var i=0;i<candidates.length;i++) {
		c = candidates[i];
		this.candidatesMap[c.name] = c;
	}

};

var race;

$(function() {
	getData();
	$("#fixMistakeBtn").click(function(e) {
		parent.location='/audit/fix/';
	});
	$('#takeBreakBtn').click(function (e) {
		$('#logout').modal({show: true});
	});
});

var getData = function() {
	$.getJSON('/candidates/', loadData);
}

var loadData = function(data) {
	loadSidebar(data);
	loadCandidates(data);
}

var loadCandidates = function(data) {
	if (data['end'] == true) {
		displayEnd();
	} else {
		if (data.transition) {
			displayTransition();
		} else {
			var currentRace = data.currentRace;

			var raceName = currentRace.name;
			var candidatesArray = currentRace.candidates;
			var candidates = [];

			for (var i=0;i<candidatesArray.length;i++) {
				c = candidatesArray[i];
				candidates.push(new Candidate(c.name,c.party));
			}

			race = new Race(raceName,candidates);
			displayVoteCountButtons();
		}
	}
}

var loadSidebar = function(data) {
	var previousRaces = data.previousRaces;
	var currentRace = data.currentRace;
	
	var currentBallotNum = data.currentBallotNum;
	var numBallots = data.numBallots;
	var currentRaceNum = data.currentRaceNum;
	var numRaces = data.numRaces;
	
	/*
	var height = $(window).height();
	$("#enteredInfo").css("height", height-120);
	$(window).resize(function(){
		var height = $(window).height();
		$("#enteredInfo").css("height", height-120);
	});
*/
	// update ballot number and progress bar
	$('#ballotNumber').html('<h1>Ballot ' + (currentBallotNum + 1) + '/' + (numBallots) + '</h1>');
	$('.bar').css('width', ((currentRaceNum)/(numRaces))*100+ '%');
	
	$('#currentBallot').html('');
	var currentBallot = $('#currentBallot');

	if (previousRaces.length == 0) {
		//currentBallot.append('<tr><td class=\'raceName\'>No selections yet for this ballot.</td></tr>');
	}

	for (var i = 0; i < previousRaces.length; i++){
		var name = previousRaces[i].name;
		var winner = previousRaces[i].winner;
		currentBallot.append('<tr><td class=\'raceName\'>' + name + '</td></tr>');
		currentBallot.append('<tr><td id=\'race' + winner + 'winner\' class=\'candidateName\'>' + winner + '</td></tr>');
		currentBallot.append('<tr><td class=\'raceSeparator\'>&nbsp;</td></tr>');
	}
	$('#enteredInfo').animate({scrollTop:$('#enteredInfo')[0].scrollHeight},500);
}

var displayTransition = function() {
	var buttonsDiv = $('.countButtons');
	buttonsDiv.html(''); //clear buttons
	buttonsDiv.html("<div class='outerTransition'><div class='innerTransition'><div class='transitionContent'></div></div></div>");

	var transitionDiv = $('.transitionContent');

	var transitionText = $("<h2 class='transition'>You are done with this ballot.<br />Please get the next ballot ready.</h2>");
	transitionDiv.append(transitionText);

	var nextBtn = $("<input type='button' class='transitionBtn raceBtn btn btn-info' value='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'></input>");
	nextBtn.click(function(e) {
		$.getJSON('vote/nextballot', loadData);
	});

	transitionDiv.append(nextBtn);
}

var displayEnd = function() {
	var buttonsDiv = $('.countButtons');
	buttonsDiv.html(''); //clear buttons
	buttonsDiv.html("<div class='outerTransition'><div class='innerTransition'><div class='transitionContent'></div></div></div>");

	var transitionDiv = $('.transitionContent');

	var transitionText = $("<h2 class='transition'>You are done with this audit.</h2>");
	transitionDiv.append(transitionText);

	var nextBtn = $("<input type='button' class='transitionBtn raceBtn btn btn-info' value='&nbsp;&nbsp;&nbsp;&nbsp;Submit Results&nbsp;&nbsp;&nbsp;&nbsp;'></input>");
	nextBtn.click(function(e) {
		parent.location='/audit/submit/';
	});

	transitionDiv.append(nextBtn);
}

var displayVoteCountButtons = function() {
	var buttonsDiv = $('.countButtons');
	var width = $(window).width();
	buttonsDiv.css("width", width-300);
	buttonsDiv.html("<a href='../../tutorial/'' class='tutorialLink'>Help</a>"); //clear buttons

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
				candidate.css('width','43%');
				candidate.css('left','27%');
				candidate.css('bottom','5%');
				candidate.addClass('btn-info-top');
			} else if (c.party == "Democratic Party") {
				candidate.css('top','5%');
				candidate.css('height','20%');
				candidate.css('width','43%');
				candidate.css('left','27%');
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
		var blank = $("<input type='button' class='raceBtn btn btn-info' value='Blank'></input>");
		blank.css('position','absolute');
		blank.css('right','6.5%');
		blank.css('top', '15%');
		blank.css('width', '20%');
		blank.css('height', '32.5%');
		buttonsDiv.append(blank);

		var writeIn = $("<input type='button' id='writeinbutton' class='raceBtn btn btn-info' value='Write-In'></input>");
		writeIn.css('position','absolute');
		writeIn.css('right','6.5%');
		writeIn.css('top', '52.5%');
		writeIn.css('width', '20%');
		writeIn.css('height', '32.5%');
		buttonsDiv.append(writeIn);

		$('.raceBtn').click(function(e) {
			$('.raceBtn').attr('disabled','disabled');
			
			var buttonsDiv = $('.countButtons');
			var winner = e.target.value;

			$.getJSON('vote', {"race_name": race.name,"winner": winner},loadData);
		});
	}
}