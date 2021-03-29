var d3 = require("d3");
var classify = require("./lib/classify.js");
var COLORS = require("./lib/colors.js");
var fmtComma = s => s.toLocaleString().replace(/\.0+$/, "");

// var margins = { top: 60, right: 15, bottom: 20, left: 50 };

var colorsDetroit = function(label) {
  if (label.toLowerCase().includes("not teaching")) { return COLORS.gray2; }
  else if (label.toLowerCase().includes("charter") & label.includes("non-Detroit")) { return COLORS.purple1; }
  else if (label.toLowerCase().includes("charter")) { return COLORS.purple2; }
  else if (label.toLowerCase().includes("traditional") & label.includes("non-Detroit")) { return COLORS.teal1; }
  else if (label.toLowerCase().includes("traditional")) { return COLORS.teal2; }
}

var colorsSchool = function(label) {
  if (label.toLowerCase().includes("not teaching")) { return COLORS.gray2;
  } else if (label.toLowerCase().includes("charter")) { return COLORS.purple1;
  } else if (label.toLowerCase().includes("traditional")) { return COLORS.teal1;
  } else if (label.includes("Universal Academy") | label.includes("Old Redford Academy") | label.includes("Voyageur College Prep") | label.includes("University Yes Academy")) { return COLORS.purple2;
  } else if (label.includes("Nolan Elementary-Middle School") | label.includes("Central High School") | label.includes("Gardner Elementary School") | label.includes("Mark Twain Elementary-Middle School")) { return COLORS.teal2;
  } else { return COLORS.gray3; }
}

function drawSankey(school, drawWidth, drawHeight, chartWidth, chartHeight, yScaleArguments, colorScale, nodes, links, container, margins, number) {

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
    .size([chartWidth,chartHeight])
    .nodes(data.nodes)
    .links(data.links)
    .yScale(yScale)
    .layout(1);


  var path = sankeyLayout.link();

  var nodeLabel = container
    .selectAll(".label-container")
    .data([0]).join(
    enter => enter.append("div")
      .attr("class", "label-container"),
    update => update
  );

  var labels = data.nodes.filter(d => d.display != "");

  nodeLabel
  .selectAll(".display-label-"+number)
  .data(labels).join(
  enter => enter.append("div")
    .attr("class", "display-label display-label-"+number)
    .style("top", d => d.y + "px")
    .style("left", d => d.x + d.dy/2 + 20 + "px")
    .style("width", 120+"px")
    .html(d => d.display ? d.display : ""),
  update => update
    .style("top", d => d.y + "px")
    .style("left", d => d.x + d.dy/2 + 20 + "px")
    .html(d => d.display ? d.display : "")
  );

  var chartWrapper = container
    .selectAll(".graphic-wrapper")
    .data([0]).join(
    enter => enter.append("svg")
      .attr("class", "graphic-wrapper")
      .attr("width", drawWidth)
      .attr("height", drawHeight),
    update => update
      .attr("width", drawWidth)
      .attr("height", drawHeight)
  );

  var chartElement = chartWrapper
    .selectAll("g")
    .data([0]).join(
      enter => enter.append("g")
        .attr("transform", "translate(" + margins.left + "," + margins.top + ")"),
      update => update
        .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
  );

  const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

  var years = chartElement
    .selectAll(".year-label")
    .data(range(yScale.domain()[0], yScale.domain()[1], 1)).join(
      enter => enter.append("text")
        .attr("class", "year-label")
        .attr("x", -8)
        .attr("y", d => yScale(d))
        .attr("dy", 7)
        .style("text-anchor", "end")
        .text(d => "Fall " + d),
      update => update
        .transition()
        .attr("x", -8)
        .attr("y", d => yScale(d))
        .style("text-anchor", "end")
        .attr("dy", 7)
  );

  if (school.includes("midyear")) {
    chartElement
      .selectAll(".year-mid")
      .data([2018.5]).join(
        enter => enter.append("text")
          .attr("class", "year-label year-mid")
          .attr("x", -8)
          .attr("y", d => yScale(d))
          .attr("dy", 7)
          .style("text-anchor", "end")
          .text("Midyear"),
        update => update
          .transition()
          .attr("x", -8)
          .attr("y", d => yScale(d))
          .style("text-anchor", "end")
          .attr("dy", 7)
    );
  }

  var links = chartElement
    .selectAll(".link")
    .data(data.links).join(
      enter => enter.append("path")
        .attr("class", d => "link link-"+number+" source-" + classify(d.source.label) + " target-" + classify(d.target.label))
        .attr("d", path)
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
        .style("stroke", d => colors(d.source.label))
        .style("opacity", d => (d.source.label == "a Detroit charter school" & d.target.label == "a Detroit charter school") |
                               (d.source.label == "a Detroit traditional school" & d.target.label == "a Detroit traditional school") |
                               (d.source.label == "a charter school" & d.target.label == "a charter school") |
                               (d.source.label == "a traditional school" & d.target.label == "a traditional school") |
                               (d.source.label == school & d.target.label == school) ?
                               0.15 : 0.5)
        .style("fill", "none"),
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

  var mousemove = function() {
    tooltip
      .style("top", (event.pageY-10)+"px")
      .style("left", event.pageX < width/2 ? (event.pageX+10)+"px" : (event.pageX-210)+"px");
  }

  links.on("mouseover", function(d){
    mousemove();
    linkData = d;
    var link = d3.select(this);
    var pct = Math.round((linkData.value/linkData.source.value)*100);
    var pctFormat = pct == 0 ? "<1%" : pct + "%";
    var allYears = d3.selectAll(".source-" + classify(d.source.label) + ".target-" + classify(d.target.label))
    link.style("opacity", 1).style("stroke", COLORS.gray1);
    tooltip.style("visibility","visible")
    tooltip.html(linkData.source.label == linkData.target.label ?
      fmtComma(linkData.value) + " " + linkData.target.label.replace("a ", "") + " teachers, " + pctFormat + " of the total, stayed at the same school." :
      fmtComma(linkData.value) + " teachers, " + pctFormat + " of the total, moved from " + linkData.source.label + " to " + linkData.target.label + ".")
  });

  container.on("mousemove", function(d) {
    mousemove();
  });

  links.on("mouseout", function(d){
    var link = d3.select(this);
    link.style("opacity", d => (d.source.label == "a Detroit charter school" & d.target.label == "a Detroit charter school") |
                               (d.source.label == "a Detroit traditional school" & d.target.label == "a Detroit traditional school") |
                               (d.source.label == "a charter school" & d.target.label == "a charter school") |
                               (d.source.label == "a traditional school" & d.target.label == "a traditional school") |
                               (d.source.label == school & d.target.label == school) ?
                               0.15 : 0.5)
    link.style("stroke", d => colors(d.source.label));
    tooltip.style("visibility","hidden");
  });

  document.addEventListener('scroll', function(e) {
    tooltip.style("visibility","hidden");
  });

}

module.exports = { drawSankey }
