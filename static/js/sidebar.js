var current = null;
var previous = null;

//GET THESE FROM AUDIT
totalBallots=audit.numBallots;

$(document).ready(function() {

      //Create progress bar at top

      var ballot1 = document.getElementById('currentBallot');
      var ballot2 = document.getElementById('previousBallot');
      allRaces = audit.getCurrentBallot().races;

      //allRaces.each(function(oneRace){
      for (var i = 0; i < allRaces.length; i++){
            var oneRace = allRaces[i].name;
            var raceDiv1 = document.createElement("div");
            var nameDiv1 = document.createElement("div");
            nameDiv1.innerHTML = "<div id=\"1"+oneRace+"Title\" class=\"name\"><p>"+oneRace+"<\/p><\/div>";
            var entryDiv1 = document.createElement("div");
            entryDiv1.innerHTML = "<div id=\"1"+oneRace+"Entry\" class=\"entry\"><\/div>";

            raceDiv1.appendChild(nameDiv1);
            raceDiv1.appendChild(entryDiv1);
            ballot1.appendChild(raceDiv1);



            var raceDiv2 = document.createElement("div");
            var nameDiv2 = document.createElement("div");
            nameDiv2.innerHTML = "<div id=\"2"+oneRace+"Title\" class=\"name\"><p>"+oneRace+"<\/p><\/div>";
            var entryDiv2 = document.createElement("div");
            entryDiv2.innerHTML = "<div id=\"2"+oneRace+"Entry\" class=\"entry\"><\/div>";

            raceDiv2.appendChild(nameDiv2);
            raceDiv2.appendChild(entryDiv2);
            ballot2.appendChild(raceDiv2);
      }

});

function updateStatusBar(){
      var bar = document.getElementById('counter');
      bar.innerHTML = "<progress value=\""+(audit.currentBallot).toString()+"\" max=\""+totalBallots.toString()+"\"><\/progress>";
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
}