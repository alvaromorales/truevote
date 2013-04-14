/*
 * Represents a candidate
 * @param first: the candidate's first name
 * @param last: the candidate's last name
 * @param party: the name of the candidate's party
 */
var Candidate = function(first,last,party) {
	this.first = first;
	this.last = last;
	this.party = party;

	this.getName = function() {
		return first + " " + last;
	}
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

	this.setWinner = function(winner) {
		if (candidates.indexOf(winner) > -1) {
			this.winner = winner;
			return this;
		}
		return null;
	}

};

/**
 * Represents a ballot
 * @param races: an array of Race objects
 */
var Ballot = function(races) {
	this.races = races;
	this.currentRace = 0;

	this.getCurrentRace = function() {
		return this.races[this.currentRace];
	};

	this.setWinner = function(winner) {
		if (this.getCurrentRace().setWinner(winner)) {
			this.currentRace += 1;
			return true;
		} else {
			return null;
		}
	};

	this.nextRace = function() {
		this.currentRace++;
		return this.getCurrentRace();
	};
	
	this.getRace(number) = function (current) {
		return races[current];
	};
};

/**
 * Represents an audit
 * @param numBallots: the number of ballots that the auditor must audit
 * @param races: an array of races for the audit
 */
var Audit = function(numBallots, races) {
	this.ballots = [];
	this.currentBallot = 0;

	for (var i=0;i<numBallots;i++) {
		this.ballots.push(new Ballot(races));
	};

	this.getPreviousBallot = function() {
		return this.ballots[currentBallot-1];
	};
	
	this.getCurrentBallot = function() {
		return this.ballots[currentBallot];
	};

	this.nextBallot = function() {
		this.currentBallot++;
		return this.getCurrentBallot();
	};
};

