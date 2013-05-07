var raceNum;
var raceName;
var ballot;

$(function() {

	var options = {
          stopOnBackdropClick:false,
          stopOnEsc: false,
            nextButton : '<button id="nextButton" class="btn btn-primary btn-mini btn-info bootstro-next-btn">Next &raquo;</button>',
            prevButton : '<button class="btn btn-primary btn-mini btn-info bootstro-prev-btn">&laquo; Previous</button>',
            finishButton : '<a href="/audit/">Finish Tutorial </a>'};
            //finishButton : '<a href="/audit/"><button class="btn btn-danger btn-mini btn-info bootstro-finish-btn" type="button" >Finish Tutorial </button></a>'};
    
      //console.log("turtorial started");
      bootstro.start($(".tutorial"), options);

      bootstro.on_complete(
          function() {
            // last slide reached
            // close slide show automatically. no more annoying alert.
            bootstro.stop();
            $('#startAudit').modal('show');
            $('#startAudit').on('hidden', function () {
  				parent.location="../../audit/"
			});

          }
        );
      
	/*$('#cancelFixMistake').click(function(e) {
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
	});*/
});