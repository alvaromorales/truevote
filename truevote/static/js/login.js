
$(function() {
	$('#password').keyup(function(event){
		if(event.keyCode == 13){
			window.location = "/welcome";
		}
	});

	$('label').removeAttr('autofocus');
	$('#id_username').focus();
});