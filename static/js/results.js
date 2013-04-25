google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);
function drawChart() {
var data = google.visualization.arrayToDataTable([
  ['Candidate', 'Votes'],
  ['Obama and Biden',  1170],
  ['Romney and Ryan',  990],
  ['Johnson and Gray',  660],
  ['Stein and Honkala',  330]
]);

var options = {
  title: 'President and Vice President', 
  'legend': 'none','colors':['#7A8EA0']
  
};

var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
chart.draw(data, options);
}
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart2);
function drawChart2() {
var data2 = google.visualization.arrayToDataTable([
  ['Candidate', 'Votes'],
  ['   Elizabeth Warren',  1150],
  ['   Scott Brown',  700]
]);

var options2 = {'title':'Senator in Congress',
		 'width':600,
		 'height':400, 
		 'legend': 'none','colors':['#7A8EA0']
  };

var chart2 = new google.visualization.BarChart(document.getElementById('chart_div2'));
chart2.draw(data2, options2);
}
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart3);
function drawChart3() {
var data3 = google.visualization.arrayToDataTable([
  ['Candidate', 'Votes'],
  ['Nicola Tsongas',  930],
  ['Jonathan Golnik',  700]
]);

var options3 = {
  title: 'Representative in Congress',
		 'width':600,
		 'height':400, 
		 'legend': 'none','colors':['#7A8EA0']};

var chart3 = new google.visualization.BarChart(document.getElementById('chart_div3'));
chart3.draw(data3, options3);
}
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart4);
function drawChart4() {
var data4 = google.visualization.arrayToDataTable([
  ['Candidate', 'Votes'],
  ['Marilyn  Devaney',  1930],
  ['Thomas Sheff',  200]
]);

var options4 = {
  title: 'Councillor',
		 'width':600,
		 'height':400, 
		 'legend': 'none','colors':['#7A8EA0']};

var chart4 = new google.visualization.BarChart(document.getElementById('chart_div4'));
chart4.draw(data4, options4);
}
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart5);
function drawChart5() {
var data5 = google.visualization.arrayToDataTable([
  ['Candidate', 'Votes'],
  ['Michael Barrett',  1000],
  ['Sandi Martinez',  100]
]);

var options5 = {
  title: 'Senator in General Court',
		 'width':600,
		 'height':400, 
		 'legend': 'none','colors':['#7A8EA0']};

var chart5 = new google.visualization.BarChart(document.getElementById('chart_div5'));
chart5.draw(data5, options5);
}
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart6);
function drawChart6() {
var data6 = google.visualization.arrayToDataTable([
  ['Candidate', 'Votes'],
  ['Cory Atkins',  1000],
  ['Michael Benn',  500]
]);

var options6 = {
  title: 'Representative in General Court',
		 'width':600,
		 'height':400, 
		 'legend': 'none','colors':['#7A8EA0']};

var chart6 = new google.visualization.BarChart(document.getElementById('chart_div6'));
chart6.draw(data6, options6);
}
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart7);
function drawChart7() {
var data7 = google.visualization.arrayToDataTable([
  ['Candidate', 'Votes'],
  ['Michael Sullivan',  1000]
]);

var options7 = {
  title: 'Clerk of Courts',
		 'width':600,
		 'height':400, 
		 'legend': 'none','colors':['#7A8EA0']};

var chart7 = new google.visualization.BarChart(document.getElementById('chart_div7'));
chart7.draw(data7, options7);
}
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart8);
function drawChart8() {
var data8 = google.visualization.arrayToDataTable([
  ['Candidate', 'Votes'],
  ['Maria Curtatone',  800]
]);

var options8 = {
  title: 'Register of Deeds',
		 'width':600,
		 'height':400, 
		 'legend': 'none','colors':['#7A8EA0']};

var chart8 = new google.visualization.BarChart(document.getElementById('chart_div8'));
chart8.draw(data8, options8);
}