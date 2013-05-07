$(function() {
	$('body').keyup(function(e){
		if(event.keyCode == 13){
			window.location = $('.proceed')[0].href;
		}
	});
});