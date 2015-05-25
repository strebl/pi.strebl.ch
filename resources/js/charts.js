new Morris.Bar({
    // ID of the element in which to draw the chart.
    element: 'pokes_graph',
    // Chart data records -- each entry in this array corresponds to a point on
    // the chart.
    data: pifinder.pokes,
    // The name of the data record attribute that contains x-values.
    xkey: 'date',
    // A list of names of data record attributes that contain y-values.
    ykeys: ['pokes'],
    // Labels for the ykeys -- will be displayed when you hover over the
    // chart.
    labels: ['Pokes'],

    barColors: ['#3498db']
});

var data = pifinder.network_distribution;

// Get the context of the canvas element we want to select
var ctx = document.getElementById("network_chart").getContext("2d");
var myNewChart = new Chart(ctx).Pie(data, {
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend network_chart__legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
    animationEasing : "easeOutQuart",
    animationSteps : 60,
    responsive: true
});

var legend = myNewChart.generateLegend();

$("#network_chart_legend").html(legend);