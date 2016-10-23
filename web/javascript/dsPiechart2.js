var 	formatAsPercentage = d3.format(".2s");

function dsPieChart2(){
    var data = [
            {category: "Tipo A", quantity: 15},
            {category: "Tipo B", quantity: 37}
        ]
        ;
    var 	width2 = 300,
        height2 = 300,
        outerRadius2 = Math.min(width2, height2) / 2,
        innerRadius2 = outerRadius2 * .999,
    // for animation
        innerRadiusFinal2 = 20,
        color2 = d3.scale.category10()    //creamos la gama de colores
        ;

    var vis2 = d3.select("#pieChart2")
            .append("svg:svg")              //creamos el elemento SVG en su div correspondiente
            .data([data])
            .attr("width", width2)
            .attr("height", height2)
            .append("svg:g")
            .attr("transform", "translate(" + outerRadius2 + "," + outerRadius2 + ")")
        ;

    var arc2 = d3.svg.arc()              //esta función creará los arcos para dibujar el gráfico
        .outerRadius(outerRadius2).innerRadius(innerRadius2);

    var arcFinal2 = d3.svg.arc().innerRadius(innerRadiusFinal2).outerRadius(outerRadius2);

    var layout = d3.layout.pie().value(function(d2) { return d2.quantity; });

    var arcs2 = vis2.selectAll("g.slice")
        .data(layout)
        .enter()
        .append("svg:g")
        .attr("class", "slice");

    arcs2.append("svg:path")
        .attr("fill", function(d, i) { return color2(i); } )
        .attr("d", arc2)
        .append("svg:title") //creamos un tooltip visual al pasar el puntero por encima
        .text(function(d) { return d.data.category + ": " + formatAsPercentage(d.data.quantity); });

    d3.selectAll("g.slice").selectAll("path").transition()
        .duration(775)
        .delay(10)
        .attr("d", arcFinal2 )
    ;

    //Añadimos también una etiqueta
    arcs2.filter(function(d) { return d.endAngle - d.startAngle > .2; })
        .append("svg:text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
//                    .attr("transform", function(d) { return "translate(" + arcFinal.centroid(d) + ")rotate(" + angle(d) + ")"; })
        .attr("transform", function(d) { return "translate(" + arcFinal2.centroid(d) + ")"; })
        .text(function(d) { return d.data.category; })
    ;

    // convierte de radianes a grados.
//        function angle(d) {
//            var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
//            return a > 90 ? a - 180 : a;
//        }


    // Añadimos el titulo
    vis2.append("svg:text")
        .attr("dy", "13em")
        .attr("text-anchor", "middle")
        .attr("class","title")
    ;
}