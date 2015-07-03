num = 1;
function draw_chart(id, state_data){
	var ctx = $(id).get(0).getContext("2d");
	var labels = [];
	var costs = [];
	_.each(state_data, function(datum) {
		labels.push(datum[0]);
		costs.push(datum[1]['cost_per_mpg'])
	});

	var data = {
	    labels: labels,
	    datasets: [
	        {
	            label: "Cost Effectivness",
	            fillColor: "rgba(151,187,205,0.5)",
	            strokeColor: "rgba(151,187,205,0.8)",
	            highlightFill: "rgba(151,187,205,0.75)",
	            highlightStroke: "rgba(151,187,205,1)",
	            data: costs
	        }
	    ]
	};
	var options = {
    	tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= format_money(value) %>",
    	scaleBeginAtZero: false,
	};


	var myBarChart = new Chart(ctx).Bar(data, options);
}

function draw_google_chart(id, state_data, param){
	var labels = [];
	var costs = [];
	var combined = [];
	_.each(state_data, function(datum) {
		labels.push(datum[0]);
		costs.push(datum[1][param])
		combined.push([datum[0], datum[1][param]]);
	});

	var chart_data = [['State', param]].concat(combined);

    var data = google.visualization.arrayToDataTable(
    	chart_data
    );

    var options = {
      chart: {
        title: param,
      },
		  vAxis: {
		  	minValue: 60,
		  }
    };

    var chart = new google.charts.Bar(document.getElementById(id));
    compile_and_insert_html("#table-template", "#table-" + num++, combined);
    chart.draw(data, options);
}

function draw_map(id, state_data, param) {
	var combined = [];
	_.each(state_data, function(datum){
		combined.push([datum[0], datum[1][param]]);
	});

	var chart_data = [['State', param]].concat(combined);
    var data = google.visualization.arrayToDataTable(
    	chart_data
    );

    var options = {
    	region: 'US',
    	resolution: 'provinces',
    	colorAxis: {colors: ['green', 'white']}
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);

}

function compile_and_insert_html(template_id, div_id, data) {
	var template = _.template($(template_id).html());
	var template_html = template({
		'rows': data
	});
	$(div_id).html(template_html);
}
