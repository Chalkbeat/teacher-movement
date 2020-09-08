<template>
  <div id="graphic-container">
    <div id="tooltip"></div>
    <div class="graphic-left" id="graphic"></div>
    <div class="graphic-right">
      <div class="trigger" v-for="step in copy.steps">{{ step }}</div>
    </div>
  </div>
</template>

<script>
  var d3 = require("d3");
  const gs = require("graph-scroll");
  var md = require("markdown-it")();
  var sankey = require("../sankey.js");
  var links = require("../data/links.sheet.json");
  var nodes = require("../data/nodes.sheet.json");
  var labels = require("../data/labels.sheet.json");
  var COLORS = require("../lib/colors.js");
  var classify = require("../lib/classify.js");

  module.exports = {
    name: 'graphic',
    props: ['copy'],
    data(){ return {
      links: links,
      nodes: nodes,
      labels: labels
    } },
    methods: {
      md: function(input) {
        return md.render(input);
      },
      mdInline: function(input) {
        return md.renderInline(input);
      }
    },
    mounted() {
      var graphicDiv = d3.select('#graphic');
      var margins = { top: 30, right: 15, bottom: 20, left: 50 };
      var width = graphicDiv.node().clientWidth;
      var height = 500;
      var chartWidth = width - margins.left - margins.right;
      var chartHeight = height - margins.top - margins.bottom;
      var tooltip = d3.select("#tooltip");

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
        } else if (label.includes("Old Redford Academy") | label.includes("Voyageur College Prep") |label.includes("Hope of Detroit Academy") | label.includes("University Yes Academy")) { return COLORS.purple2;
        } else if (label.includes("Nolan Elementary-Middle School") | label.includes("Central High School") |label.includes("Gardner Elementary School") | label.includes("Mark Twain Elementary-Middle School")) { return COLORS.teal2;
        } else { return COLORS.gray3; }
      }

      var draw = function(school, drawWidth, drawHeight, colors, nodes, links) {

        var yScale = d3
          .scaleLinear()
          .domain([2015, 2019])
          .range([16, drawHeight]); // Not sure why this extra 10 is needed to align correctly


        var nodesFilter = nodes.filter(d => d.select == school);
        var linksFilter = links.filter(d => d.select == school);

        let data = {
          nodes: nodesFilter,
          links: linksFilter,
        }

        var sankeyLayout = d3.sankey()
          .nodeWidth(12)
          .size([drawWidth,drawHeight])
          .nodes(data.nodes)
          .links(data.links)
          .layout(1)
          .yScale(yScale);


        var path = sankeyLayout.link();

        var chartWrapper = graphicDiv
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
              .text(d => d),
            update => update
              .transition()
              .attr("x", -margins.left)
              .attr("y", d => yScale(d))
        );

        var links = chartElement
          .selectAll(".link")
          .data(data.links).join(
            enter => enter.append("path")
              .attr("class", d => "link source-" + classify(d.source.label) + " target-" + classify(d.target.label))
              .attr("d", path)
              .style("stroke-width", function(d) { return Math.max(1, d.dy); })
              .style("stroke", d => colors(d.source.label))
              .style("fill", "none")
              .style("opacity", 0.3),
            update => update
              .transition()
              .attr("class", d => "link source-" + classify(d.source.label) + " target-" + classify(d.target.label))
              .attr("d", path)
              .style("stroke-width", function(d) { return Math.max(1, d.dy); })
              .style("stroke", d => colors(d.source.label))
        );

        var nodes = chartElement
          .selectAll(".node")
          .data(data.nodes).join(
            enter => enter.append("rect")
              .attr("class", d => "node node-" + classify(d.label))
              .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
              .attr("height", sankeyLayout.nodeWidth())
              .attr("width", function(d) { return d.dy; })
              .style("fill", d => colors(d.label)),
            update => update
              .transition()
              .attr("class", d => "node node-" + classify(d.label))
              .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
              .attr("height", sankeyLayout.nodeWidth())
              .attr("width", function(d) { return d.dy; })
              .style("fill", d => colors(d.label))
        );

        var nodeLabel = chartElement
          .selectAll(".display-label")
          .data(data.nodes).join(
          enter => enter.append("text")
            .attr("class", "display-label")
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
            .attr("x", d => d.dy/2)
            .attr("y", -18)
            .style("fill", COLORS.gray1)
            .text(d => d.display ? d.display : ""),
          update => update
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
            .attr("x", d => d.dy/2)
            .text(d => d.display ? d.display : "")
        );

        var nodeLabelArrows = chartElement
          .selectAll(".display-label-arrow")
          .data(data.nodes).join(
          enter => enter.append("text")
            .attr("class", "display-label-arrow")
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
            .attr("x", d => d.dy/2)
            .attr("y", -4)
            .style("fill", d => colors(d.label))
            .text(d => d.display ? "▼" : ""),
          update => update
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
            .attr("x", d => d.dy/2)
            .attr("y", -4)
            .style("fill", d => colors(d.label))
            .text(d => d.display ? "▼" : "")
        );

        links.on("mouseover", function(d){
          linkData = d;
          var link = d3.select(this);
          var allYears = d3.selectAll(".source-" + classify(d.source.label) + ".target-" + classify(d.target.label))
          allYears.style("opacity", 0.6);
          link.style("opacity", 1).style("stroke", COLORS.gray1);
          tooltip.style("visibility","visible")
          tooltip.html(linkData.source.label == linkData.target.label ?
              // Same district
              "<strong>" + linkData.value + "</strong> teachers remained at <strong>" +
              linkData.target.label + " schools</strong> from " +
              linkData.source.name.substr(-4) + " to " +
              linkData.target.name.substr(-4) :
              // Different district
              "<strong>" + linkData.value + "</strong> teachers moved from <strong>" +
              linkData.source.label + " schools</strong> to <strong>" +
              linkData.target.label + " schools</strong> from " +
              linkData.source.name.substr(-4) + " to " +
              linkData.target.name.substr(-4));
        });

        links.on("mousemove", function(){
          return tooltip
            .style("top", (event.pageY-10)+"px")
            .style("left", event.pageX < width/2 ? (event.pageX+10)+"px" : (event.pageX-210)+"px");
        });

        links.on("mouseout", function(d){
          var link = d3.select(this);
          var allYears = d3.selectAll(".source-" + classify(d.source.label) + ".target-" + classify(d.target.label));
          allYears.style("opacity", 0.3);
          link.style("stroke", d => colors(d.source.label));
          tooltip.style("visibility","hidden");
        });

      }



      var t = d3.transition()
        .duration(800)
        .ease(d3.easeQuadInOut);

      var drawAnimation = "draw 3000ms ease-in 4ms forwards";

      window.updateGraphic = function(graphicSelector) {
        var stepNodes, stepLinks;

        var steps = [
          function step0() {
            draw("University Yes Academy", 200, 100, colorsSchool, nodes, links);
            stepNodes = d3.selectAll(".node");
            stepLinks = d3.selectAll(".link");
            stepLinks.style("animation","none");
            stepNodes.style("visibility", d => d.name.includes("University Yes Academy") ? "visible" : "hidden");
          },
          function step1() {
            draw("University Yes Academy", 200, 400, colorsSchool, nodes, links);
            stepNodes = d3.selectAll(".node");
            stepLinks = d3.selectAll(".link");
            stepLinks.style("animation",d => d.target_label.includes("University Yes Academy") &
                                             d.source_label.includes("University Yes Academy") ?
                                             drawAnimation : "none");
          },
          function step2() {
            stepLinks.style("animation",d => (d.source_label.includes("University Yes Academy") & d.target_label.includes("University Yes Academy")) |
                                              (d.source_label.includes("University Yes Academy") & d.target_label.includes("Charter")) ?
                                              drawAnimation : "none");
            stepNodes.style("visibility",d => (d.name.includes("University Yes Academy")) |
                                              (d.name.includes("Charter") & !d.name.includes("2015")) ?
                                              "visible" : "hidden");
          },
          function step3() {
            stepLinks.style("animation",d => (d.source_label.includes("University Yes Academy") & d.target_label.includes("University Yes Academy")) |
                                              (d.source_label.includes("University Yes Academy") & d.target_label.includes("Charter")) |
                                              (d.source_label.includes("University Yes Academy") & d.target_label.includes("Traditional")) ?
                                              drawAnimation : "none");
            stepNodes.style("visibility",d => (d.name.includes("University Yes Academy")) |
                                              (d.name.includes("Charter") & !d.name.includes("2015")) |
                                              (d.name.includes("Traditional") & !d.name.includes("2015")) ?
                                              "visible" : "hidden");
          },
          function step4() {
            draw("University Yes Academy", 200, 400, colorsSchool, nodes, links);
            stepNodes = d3.selectAll(".node");
            stepLinks = d3.selectAll(".link");
            stepLinks.style("animation",d => (d.source_label.includes("University Yes Academy") & d.target_label.includes("University Yes Academy")) |
                                              (d.source_label.includes("University Yes Academy") & d.target_label.includes("Charter")) |
                                              (d.source_label.includes("University Yes Academy") & d.target_label.includes("Traditional")) |
                                              (d.source_label.includes("University Yes Academy") & d.target_label.includes("None")) ?
                                              drawAnimation : "none");
            stepNodes.style("visibility",d => (d.name.includes("University Yes Academy")) |
                                              (d.name.includes("Charter") & !d.name.includes("2015")) |
                                              (d.name.includes("Traditional") & !d.name.includes("2015")) |
                                              (d.name.includes("None") & !d.name.includes("2015")) ?
                                              "visible" : "hidden");
          },
          function step5() {
            draw("Detroit", chartWidth, chartHeight, colorsDetroit, nodes, links);
            stepNodes = d3.selectAll(".node");
            stepLinks = d3.selectAll(".link");
            stepLinks.style("animation", drawAnimation);
            stepNodes.style("visibility","visible");
          }
        ]

        function update(step) {
          steps[step].call()
        }

        function setup() {

        }

        setup();

        return {
          update: update,
        }

      } // end update graphic function

      var graphicEl = d3.select('#graphic-container');
      var triggers = d3.selectAll('.trigger');
      var viewportHeight = window.innerHeight;
      var graphic = updateGraphic('#graphic-container');

      gs.graphScroll()
        .container(graphicEl)
        .graph(graphicDiv)
        .sections(triggers)
        .offset(100)
        .on('active', function(i){ graphic.update(i); });

    } // end mounted
  } // end exports

</script>
