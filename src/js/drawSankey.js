var d3 = require("d3");
var classify = require("./lib/classify.js");
var COLORS = require("./lib/colors.js");

var margins = { top: 60, right: 15, bottom: 20, left: 50 };

var colorsDetroit = function(label) {
  if (label.includes("Not Teaching")) { return COLORS.gray2; }
  else if (label.includes("Charter") & label.includes("Non-Detroit")) { return COLORS.purple1; }
  else if (label.includes("Charter")) { return COLORS.purple2; }
  else if (label.includes("Traditional") & label.includes("Non-Detroit")) { return COLORS.teal1; }
  else if (label.includes("Traditional")) { return COLORS.teal2; }
}

var colorsSchool = function(label) {
  if (label.includes("Not Teaching")) { return COLORS.gray2;
  } else if (label.includes("Charter")) { return COLORS.purple1;
  } else if (label.includes("Traditional")) { return COLORS.teal1;
  } else if (label.includes("Universal Academy") | label.includes("Old Redford Academy") | label.includes("Voyageur College Prep") | label.includes("University Yes Academy")) { return COLORS.purple2;
  } else if (label.includes("Nolan Elementary-Middle School") | label.includes("Central High School") | label.includes("Gardner Elementary School") | label.includes("Mark Twain Elementary-Middle School")) { return COLORS.teal2;
  } else { return COLORS.gray3; }
}

function drawSankey(school, drawWidth, drawHeight, chartWidth, chartHeight, yScaleArguments, colorScale, nodes, links, container, number) {

  var colors = colorScale == "school" ? colorsSchool : colorsDetroit;
  var width = container.node().clientWidth;
  var tooltip = d3.select("#tooltip-"+number);

  var yScale = d3
    .scaleLinear()
    .domain(yScaleArguments[0])
    .range(yScaleArguments[1]);

  var nodesFilter = nodes.filter(d => d.select == school);
  var linksFilter = links.filter(d => d.select == school);

  let data = {
    nodes: nodesFilter,
    links: linksFilter,
  }

  var sankeyLayout = d3.sankey()
    .nodeWidth(8)
    .size([drawWidth,drawHeight])
    .nodes(data.nodes)
    .links(data.links)
    .yScale(yScale)
    .layout(1);


  var path = sankeyLayout.link();

  var chartWrapper = container
    .selectAll(".graphic-wrapper")
    .data([0]).join(
    enter => enter.append("svg")
      .attr("class", "graphic-wrapper")
      .attr("width", chartWidth + margins.left + margins.right)
      .attr("height", chartHeight + margins.top + margins.bottom),
    update => update
      .attr("width", chartWidth + margins.left + margins.right)
      .attr("height", chartHeight + margins.top + margins.bottom)
  );

  var chartElement = chartWrapper
    .selectAll("g")
    .data([0]).join(
      enter => enter.append("g")
        .attr("transform", "translate(" + margins.left + "," + margins.top + ")"),
      update => update
        .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
  );

  var years = chartElement
    .selectAll(".year-label")
    .data([2015,2016,2017,2018,2019]).join(
      enter => enter.append("text")
        .attr("class", "year-label")
        .attr("x", -margins.left)
        .attr("y", d => yScale(d))
        .attr("dy", 9)
        .text(d => d),
      update => update
        .transition()
        .attr("x", -margins.left)
        .attr("y", d => yScale(d))
        .attr("dy", 9)
  );

  var links = chartElement
    .selectAll(".link")
    .data(data.links).join(
      enter => enter.append("path")
        .attr("class", d => "link link-"+number+" source-" + classify(d.source.label) + " target-" + classify(d.target.label))
        .attr("d", path)
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
        .style("stroke", d => colors(d.source.label))
        .style("fill", "none")
        .style("opacity", 0.3),
      update => update
        .transition()
        .attr("class", d => "link link-"+number+" source-" + classify(d.source.label) + " target-" + classify(d.target.label))
        .attr("d", path)
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
        .style("stroke", d => colors(d.source.label))
  );

  var sourceNodes = chartElement
    .selectAll(".node-source-"+number)
    .data(data.nodes).join(
      enter => enter.append("rect")
        .attr("class", d => "node node-source-"+number+" node-source-"+number+"-" + classify(d.label))
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .attr("height", sankeyLayout.nodeWidth())
        .attr("width", function(d) { return d.ds; })
        .style("fill", d => colors(d.label)),
      update => update
        .transition()
        .attr("class", d => "node node-source-"+number+" node-source-"+number+"-" + classify(d.label))
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .attr("height", sankeyLayout.nodeWidth())
        .attr("width", function(d) { return d.ds; })
        .style("fill", d => colors(d.label))
  );

  var targetNodes = chartElement
    .selectAll(".node-target-"+number)
    .data(data.nodes).join(
      enter => enter.append("rect")
        .attr("class", d => "node node-target-"+number+" node-target-"+number+"-" + classify(d.label))
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .attr("height", sankeyLayout.nodeWidth())
        .attr("width", function(d) { return d.dt; })
        .style("fill", d => colors(d.label)),
      update => update
        .transition()
        .attr("class", d => "node node-target-"+number+" node-target-"+number+"-" + classify(d.label))
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .attr("height", sankeyLayout.nodeWidth())
        .attr("width", function(d) { return d.dt; })
        .style("fill", d => colors(d.label))
  );

  var nodeLabel = chartElement
    .selectAll(".display-label-"+number)
    .data(data.nodes).join(
    enter => enter.append("text")
      .attr("class", "display-label display-label-"+number)
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("x", d => d.dy/2)
      .attr("y", -38)
      .style("fill", COLORS.gray1)
      .html(d => d.display ? d.display : ""),
    update => update
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("x", d => d.dy/2)
      .html(d => d.display ? d.display : "")
  );

  var nodeLabelArrows = chartElement
    .selectAll(".display-label-arrow-"+number)
    .data(data.nodes).join(
    enter => enter.append("text")
      .attr("class", "display-label-arrow display-label-arrow-"+number)
      .attr("transform", function(d) { return "translate(" + (d.x - 5) + "," + d.y + ")"; })
      .attr("x", d => d.dy/2)
      .attr("y", -6)
      .style("fill", d => colors(d.label))
      .text(d => d.display ? "▼" : ""),
    update => update
      .attr("transform", function(d) { return "translate(" + (d.x - 5) + "," + d.y + ")"; })
      .attr("x", d => d.dy/2)
      .attr("y", -6)
      .style("fill", d => colors(d.label))
      .text(d => d.display ? "▼" : "")
  );


  links.on("mouseover", function(d){
    // console.log(d);
    mousemove();
    linkData = d;
    var link = d3.select(this);
    var allYears = d3.selectAll(".source-" + classify(d.source.label) + ".target-" + classify(d.target.label))
    allYears.style("opacity", 0.6);
    link.style("opacity", 1).style("stroke", COLORS.gray1);
    tooltip.style("visibility","visible")
    tooltip.html(linkData.source.label == linkData.target.label ?
        // Same district
        "<strong>" + linkData.value + "</strong> teachers, " + Math.round((linkData.value/linkData.source.value)*100) + "% of the total, remained at <strong>" +
        linkData.target.label + " schools</strong> from " +
        linkData.source.name.substr(-4) + " to " +
        linkData.target.name.substr(-4) :
        // Different district
        "<strong>" + linkData.value + "</strong> teachers, " + Math.round((linkData.value/linkData.source.value)*100) + "% of the total, moved from <strong>" +
        linkData.source.label + " schools</strong> to <strong>" +
        linkData.target.label + " schools</strong> from " +
        linkData.source.name.substr(-4) + " to " +
        linkData.target.name.substr(-4));
  });

  links.on("mousemove", mousemove);

  links.on("mouseout", function(d){
    var link = d3.select(this);
    var allYears = d3.selectAll(".source-" + classify(d.source.label) + ".target-" + classify(d.target.label));
    allYears.style("opacity", 0.3);
    link.style("stroke", d => colors(d.source.label));
    tooltip.style("visibility","hidden");
  });

  var mousemove = function() {
    tooltip
      .style("top", (event.pageY-10)+"px")
      .style("left", event.pageX < width/2 ? (event.pageX+10)+"px" : (event.pageX-210)+"px");
  }

}

module.exports = { drawSankey }
