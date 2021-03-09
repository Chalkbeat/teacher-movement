<template>
  <div id="graphic-container-6">
    <div id="tooltip-6" class="tooltip"></div>
    <div class="graphic-left" id="graphic-6"></div>
    <div class="graphic-right">
      <div class="trigger trigger-6" v-for="step in copy.graphic6" v-html="md(step.value)"></div>
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
      var graphicDiv = d3.select('#graphic-6');
      var margins = { top: 60, right: 15, bottom: 20, left: 50 };
      var width = graphicDiv.node().clientWidth;
      var height = 500;
      var chartWidth = width - margins.left - margins.right;
      var chartHeight = height - margins.top - margins.bottom;
      var yScaleArguments = [[2015, 2019],[0, chartHeight]]

      var drawAnimation = "draw 3000ms ease-in 4ms forwards";

      // Select targetNodes and sourceNodes separately. For now, this is focused on source.
      window.updateGraphic = function(graphicSelector) {
        var stepNodesSource, stepNodesTarget, stepLinks, stepLabel, stepArrow;

        var steps = [
          function step0() {
            drawSankey.drawSankey("Old Redford Academy", 200, chartHeight, chartWidth, chartHeight, yScaleArguments, "school", nodes, links, graphicDiv, 6);
            stepNodesSource = d3.selectAll(".node-source-6");
            stepNodesTarget = d3.selectAll(".node-target-6");
            stepLinks = d3.selectAll(".link-6");
            stepLinks.style("visibility","visible");
            stepLinks.style("animation",d =>  (d.source_label.includes("Old Redford Academy"))  ?
                                              drawAnimation : "none");
            stepNodesSource.style("visibility", d => (d.name.includes("Old Redford Academy")) ? "visible" : "hidden");
            stepNodesTarget.style("visibility","visible");
          },
          function step1() {

          },
          function step2() {

          },
          function step3() {

          },
          function step4() {

          },
          function step5() {

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

      var graphicEl = d3.select('#graphic-container-6');
      var triggers = d3.selectAll('.trigger-6');
      var viewportHeight = window.innerHeight;
      var graphic = updateGraphic('#graphic-container-6');

      gs.graphScroll()
        .container(graphicEl)
        .graph(graphicDiv)
        .sections(triggers)
        .offset(100)
        .on('active', function(i){ graphic.update(i); });

    } // end mounted
  } // end exports

</script>
