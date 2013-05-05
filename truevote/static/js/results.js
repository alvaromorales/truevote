google.load("visualization", "1", {packages:["corechart"]});

var raceData;

function createNavTables(){

  var count = 0;

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

    var winner_c = null;
    var winner_c_count=-1;
    var winner_o = null;
    var winner_o_count=-1;

    raceInfo_c = objectToArray(raceData[race][0]); //Need all results to determine projected winner
    for(var i=1; i<raceInfo_c.length; i++){
      if (raceInfo_c[i][1] > winner_c_count){
        winner_c_count = raceInfo_c[i][1];
        winner_c = raceInfo_c[i][0];
      }
    }

    raceInfo_o = objectToArray(raceData[race][1]); //Need all results to determine projected winner
    for(var i=1; i<raceInfo_o.length; i++){
      if (raceInfo_o[i][1] > winner_o_count){
        winner_o_count = raceInfo_o[i][1];
        winner_o = raceInfo_o[i][0];
      }
    }

    //Now that projected winners are established, we can fill in the graph titles
    if (count ==0){
      //$('#auditTabTable').innerHTML = ("<div class=\"tab-pane active\" id=\"aTab"+count.toString()+"\"><h3>Projected Winner: "+winner_c+"</h3><div class=\"center chart\" id=\"a_chart_div"+count.toString()+"\"></div></div>");
      $('#oTabTable').append("<div class=\"tab-pane active\" id=\"oTab"+count.toString()+"\"><h3>Projected Winner: "+winner_o+"</h3><div class=\"center chart\" id=\"o_chart_div"+count.toString()+"\"></div></div>");
      //$('#overallTabContent').append("<div class=\"tab-pane active\" id=\"oTab");
      $('#auditTabTable').append("<div class=\"tab-pane active\" id=\"aTab"+count.toString()+"\"><h3>Projected Winner: "+winner_c+"</h3><div class=\"center chart\" id=\"a_chart_div"+count.toString()+"\"></div></div>");
      var aDiv = document.getElementById('aTab');
      aDiv.parentNode.removeChild(aDiv);
      var oDiv = document.getElementById('oTab');
      oDiv.parentNode.removeChild(oDiv);

    }
    else{
      $('#auditTabTable').append("<div class=\"tab-pane\" id=\"aTab"+count.toString()+"\"><h3>Projected Winner: "+winner_c+"</h3><div class=\"center chart\" id=\"a_chart_div"+count.toString()+"\"></div></div>");
      $('#oTabTable').append("<div class=\"tab-pane\" id=\"oTab"+count.toString()+"\"><h3>Projected Winner: "+winner_o+"</h3><div class=\"center chart\" id=\"o_chart_div"+count.toString()+"\"></div></div>");
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

      var a_options = {'width':620,
                    'height':400,
                  'legend': 'none',
                  'backgroundColor': '#eee',
                  'backgroundColor.strokeWidth': '2px',
                  'colors':['#0520C3', '#5F0000', '#7A8EA0', '#7A8EA0', '#7A8EA0', '#7A8EA0', '#7A8EA0', '#7A8EA0', '#7A8EA0']};

      var a_chart = new google.visualization.BarChart(document.getElementById('a_chart_div'+count.toString()));
      a_chart.draw(a_data, a_options);


      var o_data = google.visualization.arrayToDataTable(objectToArray(raceData[race][1]));

      var o_options = {'width':620,
                    'height':400,
                  'legend': 'none',
                  'backgroundColor': '#eee',
                  'colors':['#0520C3', '#5F0000', '#7A8EA0', '#7A8EA0', '#7A8EA0', '#7A8EA0', '#7A8EA0', '#7A8EA0', '#7A8EA0']};

      var o_chart = new google.visualization.BarChart(document.getElementById('o_chart_div'+count.toString()));
      o_chart.draw(o_data, o_options);

      count++;
    } 
}

$(document).ready(function() {
  $.getJSON('/results/', function(data) {
    raceData = data;
    createTabContents();
    createNavTables();
    getGraphs();
  });
  
});
