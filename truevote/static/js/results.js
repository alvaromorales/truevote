google.load("visualization", "1", {packages:["corechart"]});

function getData(){

    raceData = {
    "President and Vice President": [
      {
        "Obama and Biden": 15,
        "Romney and Ryan" : 10,
        "Johnson and Gray" : 2,
        "Stein and Honkala" : 0,
        "Blank" : 0,
        "Write-In" : 0
      },
      {
        "Obama and Biden": 150,
        "Romney and Ryan" : 100,
        "Johnson and Gray" : 24,
        "Stein and Honkala" : 0,
        "Blank" : 0,
        "Write-In" : 0
      }
    ],
    "Senator in Congress": [
      {
        "Elizabeth Warren" : 30,
        "Scott Brown" : 15,
        "Blank" : 10,
        "Write-In" : 0
      },
      {
        "Elizabeth Warren" : 300,
        "Scott Brown" : 153,
        "Blank" : 100,
        "Write-In" : 0
      }
    ]
  }
}

function createNavTables(){

  var count = 0

  for (var race in raceData){
    if (count ==0){ //The first element should be the active one
      $('#auditNavTable').append("<li class=\"active\"><a href=\"#aTab"+count.toString()+"\" data-toggle=\"tab\"><div class=\"raceTitle\">"+race+"</div></a></li>");
      $('#oNavTable').append("<li class=\"active\"><a href=\"#oTab"+count.toString()+"\" data-toggle=\"tab\"><div class=\"raceTitle\">"+race+"</div></a></li>");
    }
    else{ //Otherwise, the element is not active
      $('#auditNavTable').append("<li><a href=\"#aTab"+count.toString()+"\" data-toggle=\"tab\"><div class=\"raceTitle\">"+race+"</div></a></li>");
      $('#oNavTable').append("<li><a href=\"#oTab"+count.toString()+"\" data-toggle=\"tab\"><div class=\"raceTitle\">"+race+"</div></a></li>");
    }
    count++;
  }

  totalRaces = count;
}

function createTabContents(){


  var count=0

  for (var race in raceData){
    if (count ==0){
      $('#auditTabTable').innerHTML = ("<div class=\"tab-pane active\" id=\"aTab"+count.toString()+"\"><h3>"+race+"</h3><div class=\"center chart\" id=\"a_chart_div"+count.toString()+"\"></div></div>");
      $('#oTabTable').innerHTML = ("<div class=\"tab-pane active\" id=\"oTab"+count.toString()+"\"><h3>"+race+"</h3><div class=\"center chart\" id=\"o_chart_div"+count.toString()+"\"></div></div>");
      //$('#overallTabContent').append("<div class=\"tab-pane active\" id=\"oTab");
    }
    else{
      $('#auditTabTable').append("<div class=\"tab-pane\" id=\"aTab"+count.toString()+"\"><h3>"+race+"</h3><div class=\"center chart\" id=\"a_chart_div"+count.toString()+"\"></div></div>");
      $('#oTabTable').append("<div class=\"tab-pane\" id=\"oTab"+count.toString()+"\"><h3>"+race+"</h3><div class=\"center chart\" id=\"o_chart_div"+count.toString()+"\"></div></div>");
    }

    count++;
  }
}

function objectToArray(objectDict){

  info = [['Candidate', 'Votes']];
  for (var candidateData in objectDict){
    info.push([candidateData, objectDict[candidateData]]);
  }

  return info; 
}

function getGraphs(){

  count=0;

  for (race in raceData){
    
      var a_data = google.visualization.arrayToDataTable(objectToArray(raceData[race][0]));

      var a_options = {title: race, 
                    'width':600,
                    'height':400,
                  'legend': 'none','colors':['#7A8EA0']};

      var a_chart = new google.visualization.BarChart(document.getElementById('a_chart_div'+count.toString()));
      a_chart.draw(a_data, a_options);


      var o_data = google.visualization.arrayToDataTable(objectToArray(raceData[race][1]));

      var o_options = {title: race, 
                    'width':600,
                    'height':400,
                  'legend': 'none','colors':['#7A8EA0']};

      var o_chart = new google.visualization.BarChart(document.getElementById('o_chart_div'+count.toString()));
      o_chart.draw(o_data, o_options);

      count++;
    } 
}

$(document).ready(function() {
  getData();
  createTabContents();
  createNavTables();
  getGraphs();
});
