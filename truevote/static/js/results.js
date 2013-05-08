google.load("visualization", "1", {packages:["corechart"]});

var raceData;

function createNavTables(){

  for (var i=0; i<raceDataLength; i++){

      race = raceData[i]["raceName"];
  //     $('#RaceButtons').append("<button id = \""+race+"\"  class = \"rbutton btn\" value = \""+i.toString()+"\">"+race+"</button>");  


  if (i ==0){ //The first element should be the active one
        $('#RaceButtons').append("<li class=\"active\"><a class=\"pillBtn\" id=\""+i+"\" data-toggle=\"tab\"><div class=\"raceTitle\" id=\""+i+"\">"+race+"</div></a></li>");
      }
      else{ //Otherwise, the element is not active
        $('#RaceButtons').append("<li><a class=\"pillBtn\" id=\""+i+"\" data-toggle=\"tab\"><div class=\"raceTitle\" id=\""+i+"\">"+race+"</div></a></li>")
      }
  //}

  $('.pillBtn').click(function (e){
    var m = e.target.id;
    makeGraphs(parseInt(m));
  });

}
}

function objectToArray(objectDict){

  info = [['Candidate', 'Votes']];
  for (var i=0; i<objectDict.length; i++){
    candidateData = objectDict[i];
    info.push([candidateData["name"], candidateData["votes"]]);
  }
  return info; 
}

function makeGraphs(i){

  race = raceData[i];

      var winner_c = null;
      var winner_c_count=-1;
      var winner_o = null;
      var winner_o_count=-1;



      raceInfo_c = race["results"][0];
      for(var j=0; j<raceInfo_c.length; j++){

        //If two candidates have the same count, there is no single winner
        if (raceInfo_c[j]["votes"] == winner_c_count){
          winner_c = "Undecided: Tie";
        }

        //If this count is higher, update the winner
        if (raceInfo_c[j]["votes"] > winner_c_count){
          winner_c_count = raceInfo_c[j]["votes"];
          winner_c = raceInfo_c[j]["name"];
        }
      }

    raceInfo_o = race["results"][1];
    for(var k=0; k<raceInfo_o.length; k++){

      if (raceInfo_o[k]["votes"] > winner_o_count){
        winner_o = "Undecided: Tie";
      }

      if (raceInfo_o[k]["votes"] > winner_o_count){
        winner_o_count = raceInfo_o[k]["votes"];
        winner_o = raceInfo_o[k]["name"];
      }
    }

    document.getElementById("cTitle").innerHTML = "<p class=\"wName\">"+winner_c+"</p>";
    document.getElementById("oTitle").innerHTML = "<p class=\"wName\">"+winner_o+"</p>";


    var a_data = google.visualization.arrayToDataTable(objectToArray(raceData[i]["results"][0]));

      var a_options = {'width':620,
                    'height':350,
                  'legend': 'none',
                  'backgroundColor': '#eee',
                  'backgroundColor.strokeWidth': '2px',
                  'colors':['#738696']};

      var a_chart = new google.visualization.BarChart(document.getElementById('currentBallotTabGraph'));
      a_chart.draw(a_data, a_options);

      var o_data = google.visualization.arrayToDataTable(objectToArray(raceData[i]["results"][1]));

      var o_options = {'width':620,
                    'height':350,
                  'legend': 'none',
                  'backgroundColor': '#eee',
                  'colors':['#738696'],
                  'position': 'relative'};

      var o_chart = new google.visualization.BarChart(document.getElementById('previousBallotTabGraph'));
      o_chart.draw(o_data, o_options);


}


function createButtonListeners(){
  $('.rbutton').click(function (e) {
    var i = e.target.value;
    makeGraphs(i);
  });
}


$(document).ready(function() {
  $.getJSON('/results/', function(data) {
    raceData = data;
    raceDataLength = raceData.length;
    createNavTables();
    createButtonListeners();
    makeGraphs(0);
  });
});