var d3 = require("d3");
var classify = require("./lib/classify.js");
var COLORS = require("./lib/colors.js");
var tooltip = d3.select("#tooltip");

var colors = function(label) {
  if (label.includes("Moved")) { return COLORS.blue1; }
  else if (label.includes("Charter")) { return COLORS.purple2; }
  else if (label.includes("Traditional")) { return COLORS.teal2; }
  else { return COLORS.blue3; }
}

function drawSankey(school, drawWidth, drawHeight, chartWidth, chartHeight, nodes, links, container, margins, number) {

  var yScale = d3
    .scaleLinear()
    .domain([2018, 2019])
    .range([0, chartHeight]); // Not sure why this extra 10 is needed to align correctly

  var nodesFilter = nodes.filter(d => d.select == school);
  var linksFilter = links.filter(d => d.select == school);

  let data = {
    nodes: nodesFilter,
    links: linksFilter,
  }

  var sankeyLayout = d3.sankey()
    .nodeWidth(8)
    .size([chartWidth,chartHeight])
    .nodes(data.nodes)
    .links(data.links)
    .yScale(yScale)
    .layout(1);

  var path = sankeyLayout.link();

  // var nodeLabel = container
  //   .selectAll(".display-label")
  //   .data([0]).join(
  //   enter => enter.append("div")
  //     .attr("class", "display-label")
  //     .style("width", drawWidth-margins.right+"px")
  //     .html(school.replace("_General", "").replaceAll("_", " ")),
  //   update => update
  //     .html(school.replace("_General", "").replaceAll("_", " "))
  // );

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

  var links = chartElement
    .selectAll(".link")
    .data(data.links).join(
      enter => enter.append("path")
        .attr("class", d => "link link-"+number+" source-" + classify(d.source.label) + " target-" + classify(d.target.label))
        .attr("d", path)
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
        .style("stroke", d => school.includes("Teachers") ? colors(d.source_label) : COLORS.blue3)
        .style("fill", "none")
        .style("opacity", d => d.target_label.includes("Moved") ? 0.6 : 0.15),
      update => update
        .transition()
        .attr("class", d => "link link-"+number+" source-" + classify(d.source.label) + " target-" + classify(d.target.label))
        .attr("d", path)
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
        .style("stroke", d => school.includes("Teachers") ? colors(d.source_label) : COLORS.blue3)
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

  chartElement.selectAll(".percent-label")
    .data([0]).enter().append("text")
    .attr("class", "percent-label")
    .attr("x", data.nodes[1].dt + data.nodes[2].dt/2 + 8)
    .attr("y", chartHeight + sankeyLayout.nodeWidth()*3 + 4)
    .html(Math.round(data.nodes[2].targetLinks[0].percent) + "%")
    .style("text-anchor", "middle");

}

module.exports = { drawSankey }
