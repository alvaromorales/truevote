var current = null;
var previous = null;

//GET THESE FROM AUDIT
totalBallots=audit.numBallots;

$(document).ready(function() {

      //Create progress bar at top

      var ballot1 = document.getElementById('currentBallot');
      var ballot2 = document.getElementById('previousBallot');
      console.log(audit);
      allRaces = audit.getCurrentBallot().races;
      console.log("Races");
      console.log(allRaces);

      //allRaces.each(function(oneRace){
      for (var i = 0; i < allRaces.length; i++){
            var oneRace = allRaces[i].name;
            console.log(oneRace);
            var raceDiv1 = document.createElement("div");
            var nameDiv1 = document.createElement("div");
            console.log("1");
            nameDiv1.innerHTML = "<div id=\"1"+oneRace+"Title\" class=\"name\"><p>"+oneRace+"<\/p><\/div>";
            console.log("2");
            var entryDiv1 = document.createElement("div");
            entryDiv1.innerHTML = "<div id=\"1"+oneRace+"Entry\" class=\"entry\"><\/div>";
          //  var buttonDiv1 = document.createElement("div");
           // buttonDiv1.innerHTML = "<div id=\"1"+oneRace+"Button\" ><\/div>";

            raceDiv1.appendChild(nameDiv1);
            raceDiv1.appendChild(entryDiv1);
           // raceDiv1.appendChild(buttonDiv1);
            ballot1.appendChild(raceDiv1);



            var raceDiv2 = document.createElement("div");
            var nameDiv2 = document.createElement("div");
            nameDiv2.innerHTML = "<div id=\"2"+oneRace+"Title\" class=\"name\"><p>"+oneRace+"<\/p><\/div>";
            var entryDiv2 = document.createElement("div");
            entryDiv2.innerHTML = "<div id=\"2"+oneRace+"Entry\" class=\"entry\"><\/div>";
          //  var buttonDiv2 = document.createElement("div");
          //  buttonDiv2.innerHTML = "<div id=\"2"+oneRace+"Button\" ><\/div>";

            raceDiv2.appendChild(nameDiv2);
            raceDiv2.appendChild(entryDiv2);
           // raceDiv2.appendChild(buttonDiv2);
            ballot2.appendChild(raceDiv2);
      }

			// Click functionality for fix mistake button
             $("#fixMistakeButton").click(function(){
      			console.log("here button pressed + here"+allRaces.length);
      			//Add buttons to divs
      			for (var i = 0; i < allRaces.length; i++){
      			addButtonToSideBar(i);
            	
      		} 
    		 // displayPreviousBallot();
      		 });
      		 

            	   
});


function addButtonToSideBar(i){
				var raceName = allRaces[i].name;
            	var oldDiv = document.getElementById('2'+raceName+"Entry");
            	var newDiv = document.getElementById('1'+raceName+"Entry");
            	console.log(newDiv.innerHTML);
            	if (newDiv.innerHTML!= ""){
            		newDiv.innerHTML = "<button id='1"+raceName+"button' class='btn-primary errorButton'>"+newDiv.innerHTML+"<button>";
           		 	// Add click listener for new buttons
           		 	addClickListener(1, raceName);
            
            	}
           		 if (oldDiv.innerHTML!= ""){
           		 console.log("replacing inner html for first div");
            		oldDiv.innerHTML = "<button id='2"+raceName+"button' class='btn btn-primary errorButton'>"+oldDiv.innerHTML+"<button>";
            		console.log("olddiv inner html"+ oldDiv.innerHTML);
            		addClickListener(2, raceName);
            	}
            	console.log(newDiv);
	
};

function addClickListener(ballot, raceName){
 		var id = ballot+raceName+"button";
 		var button = document.getElementById(id);
        $(button).click({ballot: ballot,currentRace: raceName},function(){
            	console.log(ballot + raceName);
            });
};

function updateStatusBar(){
      var bar = document.getElementById('counter');
      bar.innerHTML = "<progress value=\""+(audit.currentBallot).toString()+"\" max=\""+totalBallots.toString()+"\"><\/progress>";
      console.log("ProgressBarUpdated");

      var ballotNum = document.getElementById('ballotNumber');
      ballotNum.innerHTML = "<p>Ballot #" + (audit.currentBallot).toString() + "<\/p>";
}

//Candidate is entered and is added to sidebar
function addCandidate(candidateName, raceObject){
      var raceName = raceObject.name;
      var updateDiv = document.getElementById('1'+raceName+"Entry");
      updateDiv.innerHTML = "<p>"+candidateName+"<\/p>";
}   

//Moves the ballot information down one,
//Current Ballot now doesn't display any information
function newBallot(){
      for (var i = 0; i < allRaces.length; i++){
            var raceName = allRaces[i].name;
            var oldDiv = document.getElementById('1'+raceName+"Entry");
            var newDiv = document.getElementById('2'+raceName+"Entry");
            newDiv.innerHTML = oldDiv.innerHTML;
            oldDiv.innerHTML = "";
      }  
};

 //Moves the ballot information up one,
//Replaces previous ballot with the one before
var displayPreviousBallot = function displayPreviousBallot(){
console.log("audit"+audit.ballots);
        previousBallot = audit.getPreviousBallot();   
      for (var i = 0; i < allRaces.length; i++){
            var raceName = allRaces[i].name;
            var upperDiv = document.getElementById('1'+raceName+"Entry");
            var lowerDiv = document.getElementById('2'+raceName+"Entry");
            upperDiv.innerHTML = lowerDiv.innerHTML;
            
            //Update previous ballot
            candidateName = previousBallot.getRace(i).winner;
            lowerDiv.innerHTML = "<p>"+candidateName+"<\/p>";
      }  
};

function removeSpaces(val) {
   return val.split(' ').join('');
};