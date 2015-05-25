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