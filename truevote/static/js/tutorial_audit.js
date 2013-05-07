/*
 * Represents a candidate
 * @param name: the candidate's first name
 * @param last: the candidate's short name
 * @param party: the name of the candidate's party
 */
var Candidate = function(name,shortname,party) {
	this.name = name;
	this.shortname = shortname;
	this.party = party;
};

/*
 * Represents a party
 * @param name: the party's full name e.g. "Democratic Party"
 * @param adjective: the adjective for a party member, e.g. "Republican"
 */
 var Party = function(name,adjective) {
 	this.name = name;
 	this.adjective = adjective;
 }

/* 
 * Represents a race
 * @param name: the race name
 * @param candidates: an array of Candidate objects
 */
var Race = function(name,candidates) {
	this.name = name;
	this.candidates = candidates;
	this.winner = '';

	this.candidatesMap = {};

	for (var i=0;i<candidates.length;i++) {
		c = candidates[i];
		this.candidatesMap[c.name] = c;
	}

	this.setWinner = function(winner) {
		if (winner === "Blank") {
			this.winner = new Candidate("Blank","Blank",null);
		} else if (winner === "Write-In") {
			this.winner = new Candidate("Write-In","Write-In",null);
		} else if (this.candidatesMap[winner]) {
			this.winner = this.candidatesMap[winner];
		}
	}

};

/**
 * Represents a ballot
 * @param races: an array of Race objects
 */
var Ballot = function(races) {
	this.races = races;
	this.currentRace = 3;

	this.getCurrentRace = function() {
		if (this.currentRace < this.races.length) {
			return this.races[this.currentRace];
		}
	};

	this.getPreviousRace = function() {
		if (this.currentRace > 0) {
			return this.races[this.currentRace-1];
		}
	};

	this.setWinner = function(winner) {
		if (this.getCurrentRace().setWinner(winner)) {
			this.currentRace += 1;
			return true;
		} else {
			return null;
		}
	};

	this.getNextRace = function() {
		var race = this.getCurrentRace();
		this.currentRace++;
		return race;
	};
};

/**
 * Represents an audit
 * @param numBallots: the number of ballots that the auditor must audit
 * @param races: an array of races for the audit
 */
var Audit = function(numBallots, races) {
	this.numBallots = numBallots;
	this.ballots = [];
	this.currentBallot = 4;
	this.totalNumRaces = numBallots*races.length;
	this.currentRaceNumber = 3;

	this.racesMap = {};

	for (var i=0;i<races.length;i++) {
		var r = races[i];
		this.racesMap[r.name] = i;
	}

	for (var j=0;j<numBallots;j++) {
		this.ballots.push(new Ballot(races));
	};

	this.getCurrentBallot = function() {
		return this.ballots[this.currentBallot];
	};

	this.getNextBallot = function() {
		this.currentBallot++;
		return this.getCurrentBallot();
	};
	
	this.getPreviousBallot = function() {
		return this.ballots[this.currentBallot-1];
	};

	this.getNextRace = function() {
		this.currentRaceNumber++;
		var race = this.getCurrentBallot().getNextRace();
		if (!race) {
			try { 
				return this.getNextBallot().getNextRace();
			} catch (err) {
				$('#endAudit').modal('show');
			}
		} else {
			return race;
		}
	}

};


///// PARTIES /////

var democraticParty = new Party("Democratic Party","Democrat");
var republicanParty = new Party("Republican Party","Republican");
var libertarianParty = new Party("Libertarian Party", "Libertarian");
var greenParty = new Party("Green-Rainbow Party", "Green-Rainbow");
var unenrolledParty = new Party("Unenrolled Party", "Unenrolled");


///// RACES /////

var presidential = new Race("Race Number 1", [
		new Candidate("Candidate A","CandidateA",democraticParty),
		new Candidate("Candidate B","CandidateB",republicanParty),
		new Candidate("Candidate C","CandidateC",libertarianParty),
		new Candidate("Candidate D","CandidateD",greenParty)
	]);

var senate = new Race("Race Number 2", [
		new Candidate("Candidate A","CandidateA",democraticParty),
		new Candidate("Candidate B","CandidateB",republicanParty),
		new Candidate("Candidate C","CandidateC",libertarianParty),
		new Candidate("Candidate D","CandidateD",greenParty)
	]);


var congress = new Race("Race Number 3", [
		new Candidate("Candidate A","CandidateA",democraticParty),
		new Candidate("Candidate B","CandidateB",republicanParty),
		new Candidate("Candidate C","CandidateC",libertarianParty),
		new Candidate("Candidate D","CandidateD",greenParty)
	]);

var councillor = new Race("Race Number 4", [
		new Candidate("Candidate A","CandidateA",democraticParty),
		new Candidate("Candidate B","CandidateB",republicanParty),
		new Candidate("Candidate C","CandidateC",libertarianParty),
		new Candidate("Candidate D","CandidateD",greenParty)
	]);



///// AUDIT /////
var audit = new Audit(5,[presidential,senate,congress,councillor]);
