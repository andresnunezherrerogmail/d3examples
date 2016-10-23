var 	formatAsPercentage = d3.format(".2s");

function dsLineChart(){
// Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

// Parse the date / time
    var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

// Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

// Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });

    var valueline2 = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close1); });

    var data = [
            {date: "1-May-12", close: 58.13, close1: 45.58},
            {date: "30-Apr-12", close: 53.98, close1: 47.58},
            {date: "27-Apr-12", close: 67.00, close1: 51.58},
            {date: "26-Apr-12", close: 89.70, close1: 65.58},
            {date: "25-Apr-12", close: 99.00, close1: 73.58},
            {date: "24-Apr-12", close: 130.48, close1: 96.58}
        ]
        ;
// Adds the svg canvas
    var svg = d3.select("body")
        .append("svg")
        .data([data])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Get the data
//    d3.csv("data.csv", function(error, data) {
//        data.forEach(function(d) {
//            d.date = parseDate(d.date);
//            d.close = +d.close;
//        });
        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.close = +d.close;
            d.close1 = +d.close1;
        });

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.close; })]);

        // Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline(data));

    svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "red")
        .attr("d", valueline2);
        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

    //});

}