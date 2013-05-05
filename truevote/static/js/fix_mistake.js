var raceNum;
var raceName;
var ballot;

$(function() {
	$('#cancelFixMistake').click(function(e) {
		parent.location='/audit/';
	});

	$('#cancelButton').click(function (e) {
		$('#confirmRestart').modal('hide');
	});

	$('#continueButton').click(function (e) {
		location.href ='/audit/restart/';
	});

	$('#btnRestart').click(function (e) {
		$('#confirmRestart').modal({show: true});
	});

	$('#cancelButtonFix').click(function (e) {
		$('#confirmFixRace').modal('hide');
	});

	$('#continueButtonFix').click(function (e) {
		$.get('/audit/fix/race', {number: raceNum}, function() {
			location.href='/audit/';
		});
	});

	$('.fixMistakeBtn').click(function (e) {
		var args = e.target.value.split('|');
		raceNum = args[0];
		raceName = args[1];
		ballot = args[2];

		console.log(raceNum);

		if (raceName == 'reset') {
			$('#fixRaceTitle').html('You are about to reset the ' + ballot + ' ballot.');
		} else {
			$('#fixRaceTitle').html('You are about to restart from "' + raceName + '" on the ' + ballot + ' ballot.');
		}
		$('#fixRaceBody').html('<h3>You will have to re-enter all information after that. Would you like to continue?</h3>');

		$('#confirmFixRace').modal({show: true});
	});
});