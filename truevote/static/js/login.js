
$(function() {
 //introJs().start();
 $('#password').keyup(function(event){
    if(event.keyCode == 13){
    	window.location = "/welcome";
   	}
});

});