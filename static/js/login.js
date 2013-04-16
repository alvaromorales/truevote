$(function() {
 console.log("login included");
 $('#passwordinput').keyup(function(event){
 console.log("keypressed:);
    if(event.keyCode == 13){
    console.log("enter pressed");
   $("#log-inButton").click();}
});

};