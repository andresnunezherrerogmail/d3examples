var 	formatAsPercentage = d3.format(".2s");

function dsPieChart(){
    var dataset = [
            {category: "Tipo A", measure: 45},
            {category: "Tipo B", measure: 75}
        ]
        ;
    var 	width = 300,
        height = 300,
        outerRadius = Math.min(width, height) / 2,
        innerRadius = outerRadius * .999,
    // for animation
        innerFinal = 0,
        color = d3.scale.category20c()    //creamos la gama de colores
        ;


    var vis = d3.select("#pieChart")
            .append("svg:svg")              //creamos el elemento SVG en su div correspondiente
            .data([dataset])
            .attr("width", width)
            .attr("height", height)
            .append("svg:g")
            .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")")
        ;

    var arc = d3.svg.arc()              //esta función creará los arcos para dibujar el gráfico
        .outerRadius(outerRadius).innerRadius(innerRadius);


    var pie = d3.layout.pie()           //usamos un Layout para no tener que calcular nosotros los puntos de inicio y final
        .value(function(d) { return d.measure; });

    var arcFinal = d3.svg.arc().innerRadius(innerFinal).outerRadius(outerRadius);

    var arcs = vis.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("svg:g")
        .attr("class", "slice");

    arcs.append("svg:path")
        .attr("fill", function(d, i) { return color(i); } )
        .attr("d", arc)
        .append("svg:title") //creamos un tooltip visual al pasar el puntero por encima
        .text(function(d) { return d.data.category + ": " + formatAsPercentage(d.data.measure); });

    d3.selectAll("g.slice").selectAll("path").transition()
        .duration(775)
        .delay(10)
        .attr("d", arcFinal )
    ;

    //Añadimos también una etiqueta
    arcs.filter(function(d) { return d.endAngle - d.startAngle > .2; })
        .append("svg:text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
//                    .attr("transform", function(d) { return "translate(" + arcFinal.centroid(d) + ")rotate(" + angle(d) + ")"; })
        .attr("transform", function(d) { return "translate(" + arcFinal.centroid(d) + ")"; })
        .text(function(d) { return d.data.category; })
    ;

//        // convierte de radianes a grados.
//        function angle(d) {
//            var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
//            return a > 90 ? a - 180 : a;
//        }


    // Añadimos el titulo
    vis.append("svg:text")
        .attr("dy", "13em")
        .attr("text-anchor", "middle")
        .attr("class","title")
    ;
}