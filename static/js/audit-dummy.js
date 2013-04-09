///// PARTIES /////

var democraticParty = new Party("Democratic Party","Democrat");
var republicanParty = new Party("Republican Party","Republican");
var greenParty = new Party("Green Party", "Green");

///// RACES /////

var presidential = new Race("President / Vice-President", [
		new Candidate("Barack","Obama",democraticParty),
		new Candidate("Mitt","Romney",republicanParty),
		new Candidate("Jill","Stein",greenParty)
	]);

var senate = new Race("Senate", [
		new Candidate("Elizabeth","Warren",democraticParty),
		new Candidate("Scott","Brown",republicanParty)
	]);

///// AUDIT /////

var audit = new Audit(50,[presidential,senate]);

console.log(audit);