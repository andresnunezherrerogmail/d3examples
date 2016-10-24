var 	formatAsPercentage = d3.format(".2s");
var parseDate = d3.time.format("%d-%b-%y").parse;
_data="data";
/*var */data = [
        {date: "1-May-12", close: 58.13, close1: 45.58},
        {date: "30-Apr-12", close: 53.98, close1: 47.58},
        {date: "27-Apr-12", close: 67.00, close1: 51.58},
        {date: "26-Apr-12", close: 89.70, close1: 65.58},
        {date: "25-Apr-12", close: 99.00, close1: 73.58},
        {date: "24-Apr-12", close: 130.48, close1: 96.58}
    ]
    ;
//var data2 = [
//        {date: "1-May-12", close: 48.13, close1: 25.58},
//        {date: "30-Apr-12", close: 43.98, close1: 47.58},
//        {date: "27-Apr-12", close: 57.00, close1: 61.58},
//        {date: "26-Apr-12", close: 79.70, close1: 85.58},
//        {date: "25-Apr-12", close: 89.00, close1: 93.58},
//        {date: "24-Apr-12", close: 83.48, close1: 106.58}
//    ]
//    ;
//var data3 = [
//        {date: "1-May-12", close: 48.13, close1: 25.58},
//        {date: "30-Apr-12", close: 43.98, close1: 47.58},
//        {date: "27-Apr-12", close: 57.00, close1: 61.58},
//        {date: "26-Apr-12", close: 79.70, close1: 85.58},
//        {date: "25-Apr-12", close: 89.00, close1: 93.58},
//        {date: "24-Apr-12", close: 83.48, close1: 106.58}
//    ]
//    ;
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

// Adds the svg canvas
    /*var */svg = d3.select("body")
        .append("svg")
        .data([data])
        .attr("id", "chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Get the data
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
        //.data([data])
        .attr("class", "line2") //"line"
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
    changeData();
}

function removeChart(){
//alert("asd");
    // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

//// Set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
//
//// Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

    //data2.forEach(function(d) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
        d.close1 = +d.close1;
    });
//
//// Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });

    var valueline2 = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close1); });
//
//    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    //y.domain([0, d3.max(data, function(d) { return d.close1; })]);
    y.domain([0, d3.max(data, function(d) { return Math.max(d.close,d.close1); })]);
//
    var _svg = d3.select("svg").transition();
    /** Esto es parte de lo antiguo, funciona*/
    //_svg.selectAll(".line")   // change the line
    //    .duration(750)
    //    .attr("d", valueline(data))
    //    ;
    //_svg.select(".line2")   // change the line
    //    .duration(750)
    //    .attr("d", valueline2(data));
    /** Aquí empieza lo nuevo*/
    var lines = svg.selectAll(".line").data(data).attr("class","line");
    var lines2 = svg.selectAll(".line2").data(data).attr("class","line2");

    lines.transition()//.duration(750)
        .attr("d",valueline(data))
        .style("stroke", function(){
            return '#'+Math.floor(Math.random()*16777215).toString(16);
        })
        ;

    // enter any new data
    lines.enter()
        .append("path")
        .attr("class","line")
        .attr("d",valueline(data))
        .style("stroke", function(){
            return '#'+Math.floor(Math.random()*16777215).toString(16);
        });

    // exit
    lines.exit()
        .remove();
    /////////////////
    lines2.transition()//.duration(750)
        .attr("d",valueline2(data))
        .style("stroke", function(){
            return '#'+Math.floor(Math.random()*16777215).toString(16);
        })
    ;

    // enter any new data
    lines2.enter()
        .append("path")
        .attr("class","line2")
        .attr("d",valueline2(data))
        .style("stroke", function(){
            return '#'+Math.floor(Math.random()*16777215).toString(16);
        });

    // exit
    lines2.exit()
        .remove();

    /** Esto es parte de lo nuevo y antiguo*/
    _svg.select(".x.axis") // change the x axis
        .duration(750)
        .call(xAxis);
        //.attr("transform", "translate(" + 0 + ",0)");
    _svg.select(".y.axis") // change the y axis
        .duration(750)
        .call(yAxis);
        //.attr("transform", "translate(" + 0 + ",10)");
    changeData();
}
function changeData() {
//    data2 = [
//            {date: "1-May-12", close: 58.13, close1: 25.58},
//            {date: "30-Apr-12", close: 45.98, close1: 57.58},
//            {date: "27-Apr-12", close: 67.00, close1: 67.58},
//            {date: "26-Apr-12", close: 79.70, close1: 83.58},
//            {date: "25-Apr-12", close: 86.00, close1: 99.58},
//            {date: "24-Apr-12", close: 65.48, close1: 88.58}
//        ]
//        ;
    if (_data == "data") {
        _data = "data2";
        data = [
            {date: "1-May-12", close: 48.13, close1: 25.58},
            {date: "30-Apr-12", close: 43.98, close1: 47.58},
            {date: "27-Apr-12", close: 57.00, close1: 61.58},
            {date: "26-Apr-12", close: 79.70, close1: 85.58},
            {date: "25-Apr-12", close: 89.00, close1: 93.58},
            {date: "24-Apr-12", close: 83.48, close1: 106.58}
        ]
        ;
    } else if (_data == "data2") {
        _data = "data3";
        data = [
            {date: "1-May-12", close: 28.13, close1: 39.58},
            {date: "30-Apr-12", close: 33.98, close1: 47.58},
            {date: "27-Apr-12", close: 37.00, close1: 53.58},
            {date: "26-Apr-12", close: 45.70, close1: 57.58},
            {date: "25-Apr-12", close: 49.00, close1: 60.58},
            {date: "24-Apr-12", close: 53.48, close1: 68.58}
        ]
        ;
    } else if (_data == "data3") {
        _data = "data";
        data = [
            {date: "1-May-12", close: 58.13, close1: 45.58},
            {date: "30-Apr-12", close: 53.98, close1: 47.58},
            {date: "27-Apr-12", close: 67.00, close1: 51.58},
            {date: "26-Apr-12", close: 89.70, close1: 65.58},
            {date: "25-Apr-12", close: 99.00, close1: 73.58},
            {date: "24-Apr-12", close: 130.48, close1: 96.58}
        ]
        ;
    }
}
