<template>
  <div id="graphic-container-5">
    <div id="tooltip-5" class="tooltip"></div>
    <div class="graphic-left" id="graphic-5"></div>
    <div class="graphic-right">
      <div class="trigger trigger-5" v-for="step in copy.graphic5" v-html="md(step.value)"></div>
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
  var COLORS = require("../lib/colors.js");

  module.exports = {
    name: 'graphic-5',
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
      var graphicDiv = d3.select('#graphic-5');
      var margins = { top: 60, right: 15, bottom: 20, left: 50 };
      var width = graphicDiv.node().clientWidth;
      var height = 500;
      var chartWidth = width - margins.left - margins.right;
      var chartHeight = height - margins.top - margins.bottom;
      var yScaleArguments = [[2015, 2019],[0, chartHeight]]

      var drawAnimation = "draw 3000ms ease-in 4ms forwards";

      // Select targetNodes and sourceNodes separately. For now, this is focused on source.
      window.updateGraphic = function(graphicSelector) {
        var stepNodes, stepLinks;

        var steps = [
          function step0() {
            drawSankey.drawSankey("Detroit", 400, chartHeight, chartWidth, chartHeight, yScaleArguments, "city", nodes, links, graphicDiv, 5);
            stepNodesSource = d3.selectAll(".node-source-5");
            stepNodesTarget = d3.selectAll(".node-target-5");
            stepLinks = d3.selectAll(".link-5");
            stepLabel = d3.selectAll(".display-label-5");
            stepArrow = d3.selectAll(".display-label-arrow-5");
            stepLinks.style("visibility","visible");
            stepLinks.style("animation",d =>  (d.source_label.includes("Charter Detroit") | d.source_label.includes("Traditional Detroit"))  ?
                                              drawAnimation : "none");
            stepNodesSource.style("visibility", d => (d.name.includes("Charter Detroit") | d.name.includes("Traditional Detroit")) ? "visible" : "hidden");
            stepNodesTarget.style("visibility","visible");
          },
          function step1() {
          },
          function step2() {
            },
          function step3() {
          },
          function step4() {
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

      var graphicEl = d3.select('#graphic-container-5');
      var triggers = d3.selectAll('.trigger-5');
      var viewportHeight = window.innerHeight;
      var graphic = updateGraphic('#graphic-container-5');

      gs.graphScroll()
        .container(graphicEl)
        .graph(graphicDiv)
        .sections(triggers)
        .offset(100)
        .on('active', function(i){ graphic.update(i); });

    } // end mounted
  } // end exports

</script>
