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
    console.log(e.target);
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
        if (raceInfo_c[j]["votes"] > winner_c_count){
          winner_c_count = raceInfo_c[j]["votes"];
          winner_c = raceInfo_c[j]["name"];
        }
      }

    raceInfo_o = race["results"][1];
    for(var k=0; k<raceInfo_o.length; k++){
      if (raceInfo_o[k]["votes"] > winner_o_count){
        winner_o_count = raceInfo_o[k]["votes"];
        winner_o = raceInfo_o[k]["name"];
      }
    }

    document.getElementById("cTitle").innerHTML = "<h3>Projected Winner: "+winner_c+"</h3>";
    document.getElementById("oTitle").innerHTML = "<h3>Projected Winner: "+winner_o+"</h3>";


    var a_data = google.visualization.arrayToDataTable(objectToArray(raceData[i]["results"][0]));

      var a_options = {'width':620,
                    'height':400,
                  'legend': 'none',
                  'backgroundColor': '#eee',
                  'backgroundColor.strokeWidth': '2px',
                  'colors':['#738696']};

      var a_chart = new google.visualization.BarChart(document.getElementById('currentBallotTabGraph'));
      a_chart.draw(a_data, a_options);

      var o_data = google.visualization.arrayToDataTable(objectToArray(raceData[i]["results"][1]));

      var o_options = {'width':620,
                    'height':400,
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
  // $.getJSON('/results/', function(data) {
  //   raceData = data;
  //   createButtons());
  //   getGraphs();
  // });

  raceData = [{"raceName": "President and Vice President", "results": [[{"votes": 1, "name": "Obama and Biden"}, {"votes": 0, "name": "Romney and Ryan"}, {"votes": 0, "name": "Johnson and Gray"}, {"votes": 0, "name": "Stein and Honkala"}], [{"votes": 36, "name": "Obama and Biden"}, {"votes": 0, "name": "Romney and Ryan"}, {"votes": 0, "name": "Johnson and Gray"}, {"votes": 0, "name": "Stein and Honkala"}]]}, {"raceName": "Senator in Congress", "results": [[{"votes": 1, "name": "Elizabeth Warren"}, {"votes": 0, "name": "Scott Brown"}], [{"votes": 20, "name": "Elizabeth Warren"}, {"votes": 0, "name": "Scott Brown"}]]}, {"raceName": "Representative in Congress", "results": [[{"votes": 1, "name": "Nicola Tsongas"}, {"votes": 0, "name": "Jonathan Golnik"}], [{"votes": 16, "name": "Nicola Tsongas"}, {"votes": 2, "name": "Jonathan Golnik"}]]}, {"raceName": "Councillor", "results": [[{"votes": 0, "name": "Marilyn Devaney"}, {"votes": 0, "name": "Thomas Sheff"}], [{"votes": 20, "name": "Marilyn Devaney"}, {"votes": 1, "name": "Thomas Sheff"}]]}, {"raceName": "Senator in General Court", "results": [[{"votes": 0, "name": "Michael Barrett"}, {"votes": 0, "name": "Sandi Martinez"}], [{"votes": 19, "name": "Michael Barrett"}, {"votes": 0, "name": "Sandi Martinez"}]]}, {"raceName": "Representative in General Court", "results": [[{"votes": 0, "name": "Cory Atkins"}, {"votes": 0, "name": "Michael Benn"}], [{"votes": 18, "name": "Cory Atkins"}, {"votes": 1, "name": "Michael Benn"}]]}, {"raceName": "Clerk of Courts", "results": [[{"votes": 0, "name": "Michael Sullivan"}], [{"votes": 19, "name": "Michael Sullivan"}]]}, {"raceName": "Register of Deeds", "results": [[{"votes": 0, "name": "Maria Curtatone"}], [{"votes": 18, "name": "Maria Curtatone"}]]}];
  raceDataLength = raceData.length;
  createNavTables();
  createButtonListeners();
   makeGraphs(0);
  
});