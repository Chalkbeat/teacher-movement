<template>
  <div id="graphic-container-1">
    <div id="tooltip-1" class="tooltip"></div>
    <div class="graphic-left" id="graphic-1"></div>
    <div class="graphic-right">
      <div class="trigger trigger-1" v-for="step in copy.graphic1" v-html="md(step.value)"></div>
    </div>
  </div>
</template>

<script>
  var d3 = require("d3");
  const gs = require("graph-scroll");
  var md = require("markdown-it")();
  var sankey = require("../sankey.js");
  var drawSankey = require("../drawSankey.js");
  var links = require("../data/links.sheet.json");
  var nodes = require("../data/nodes.sheet.json");
  var labels = require("../data/labels.sheet.json");

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
      var graphicDiv = d3.select('#graphic-1');
      var margins = { top: 60, right: 15, bottom: 20, left: 50 };
      var width = graphicDiv.node().clientWidth;
      var height = 500;
      var chartWidth = width - margins.left - margins.right;
      var chartHeight = height - margins.top - margins.bottom;
      var yScaleArguments = [[2015, 2019],[0, 200]];

      var drawAnimation = "draw 3000ms ease-in 4ms forwards";

      // Select targetNodes and sourceNodes separately. For now, this is focused on source.
      window.updateGraphic = function(graphicSelector) {
        var stepNodesSource, stepNodesTarget, stepLinks, stepLabel, stepArrow;
        // function drawSankey(school, drawWidth, drawHeight, chartWidth, chartHeight, yScaleArguments, colorScale, nodes, links, container, number) {

        var steps = [
          function step0() {
            drawSankey.drawSankey("universal_academy", 200, 100, chartWidth, chartHeight, [[2015, 2019],[0, 100]], "school", nodes, links, graphicDiv, 1);
            stepNodesSource = d3.selectAll(".node-source-1");
            stepNodesTarget = d3.selectAll(".node-target-1");
            stepLinks = d3.selectAll(".link-1");
            stepLabel = d3.selectAll(".display-label-1");
            stepArrow = d3.selectAll(".display-label-arrow-1");
            stepLinks.style("animation","none");
            stepNodesTarget.style("visibility", d => d.name.includes("Universal Academy") ? "visible" : "hidden");
            stepNodesSource.style("visibility", d => d.name.includes("Universal Academy") ? "visible" : "hidden");
            stepLabel.style("visibility", d => d.name.includes("Universal Academy") ? "visible" : "hidden");
            stepArrow.style("visibility", d => d.name.includes("Universal Academy") ? "visible" : "hidden");
          },
          function step1() {
            drawSankey.drawSankey("universal_academy", 200, chartHeight, chartWidth, chartHeight, [[2015, 2019],[0, chartHeight]], "school", nodes, links, graphicDiv, 1);
            stepNodesSource = d3.selectAll(".node-source-1");
            stepNodesTarget = d3.selectAll(".node-target-1");
            stepLinks = d3.selectAll(".link-1");
            stepLabel = d3.selectAll(".display-label-1");
            stepArrow = d3.selectAll(".display-label-arrow-1");
            stepNodesTarget.style("visibility", d => d.name.includes("Universal Academy") ? "visible" : "hidden");
            stepNodesSource.style("visibility", d => d.name.includes("Universal Academy") ? "visible" : "hidden");
            stepLinks.style("animation",d => (d.source_label.includes("Universal Academy") & d.target_label.includes("Universal Academy")) ? drawAnimation : "none");
          },
          function step2() {
            stepLinks.style("animation",d =>  (d.source_label.includes("Universal Academy") & d.target_label.includes("Universal Academy")) |
                                              (d.source_label.includes("Universal Academy") & d.target_label.includes("Charter")) ?
                                              drawAnimation : "none");
            stepNodesTarget.style("visibility",d => (d.name.includes("Universal Academy")) |
                                              (d.name.includes("Charter") & !d.name.includes("2015")) ?
                                              "visible" : "hidden");
            stepLabel.style("visibility", d => (d.name.includes("Universal Academy") | d.name.includes("Charter")) ? "visible" : "hidden");
            stepArrow.style("visibility", d => (d.name.includes("Universal Academy") | d.name.includes("Charter")) ? "visible" : "hidden");
          },
          function step3() {
            stepLinks.style("animation",d =>  (d.source_label.includes("Universal Academy") & d.target_label.includes("Universal Academy")) |
                                              (d.source_label.includes("Universal Academy") & d.target_label.includes("Charter")) |
                                              (d.source_label.includes("Universal Academy") & d.target_label.includes("Traditional")) ?
                                              drawAnimation : "none");
            stepNodesTarget.style("visibility",d => (d.name.includes("Universal Academy")) |
                                              (d.name.includes("Charter") & !d.name.includes("2015")) |
                                              (d.name.includes("Traditional") & !d.name.includes("2015")) ?
                                              "visible" : "hidden");
            stepLabel.style("visibility", d => (d.name.includes("Universal Academy") | d.name.includes("Traditional")) ? "visible" : "hidden");
            stepArrow.style("visibility", d => (d.name.includes("Universal Academy") | d.name.includes("Traditional")) ? "visible" : "hidden");
          },
          function step4() {
            stepLinks.style("animation",d =>  (d.source_label.includes("Universal Academy") & d.target_label.includes("Universal Academy")) |
                                              (d.source_label.includes("Universal Academy") & d.target_label.includes("Charter")) |
                                              (d.source_label.includes("Universal Academy") & d.target_label.includes("Traditional")) |
                                              (d.source_label.includes("Universal Academy") & d.target_label.includes("None")) ?
                                              drawAnimation : "none");
            stepNodesSource.style("visibility", d => d.name.includes("Universal Academy") ? "visible" : "hidden");
            stepNodesTarget.style("visibility",d => (d.name.includes("Universal Academy")) |
                                              (d.name.includes("Charter") & !d.name.includes("2015")) |
                                              (d.name.includes("Traditional") & !d.name.includes("2015")) |
                                              (d.name.includes("None") & !d.name.includes("2015")) ?
                                              "visible" : "hidden");
            stepLabel.style("visibility", d => (d.name.includes("Universal Academy") | d.name.includes("None")) ? "visible" : "hidden");
            stepArrow.style("visibility", d => (d.name.includes("Universal Academy") | d.name.includes("None")) ? "visible" : "hidden");
          },
          function step5() {

          },
          function step6() {

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

      var graphicEl = d3.select('#graphic-container-1');
      var triggers = d3.selectAll('.trigger-1');
      var viewportHeight = window.innerHeight;
      var graphic = updateGraphic('#graphic-container-1');

      gs.graphScroll()
        .container(graphicEl)
        .graph(graphicDiv)
        .sections(triggers)
        .offset(100)
        .on('active', function(i){ graphic.update(i); });

    } // end mounted
  } // end exports

</script>
