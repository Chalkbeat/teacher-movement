<template>
  <div id="graphic-container-4">
    <!-- <div class="scroll-note note">Scroll using your mouse to continue reading.</div> -->
    <div id="tooltip-4" class="tooltip"></div>
    <div class="graphic-left">
      <div id="graphic-4"></div>
      <div class="note">Click or hover on the graphic for more details.</div>
    </div>
    <div class="graphic-right">
      <div class="trigger trigger-4" v-for="step in copy.graphic4" v-html="md(step.value)"></div>
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

  module.exports = {
    name: 'graphic-4',
    props: ['copy'],
    data(){ return {
      links: links,
      nodes: nodes,
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
      setTimeout(function(){
        var graphicDiv = d3.select('#graphic-4');
        var margins = { top: 60, right: 15, bottom: 20, left: 76 };
        var marginsSmall = { top: 60, right: 15, bottom: 10, left: 76 };
        var width = 300;
        var height = 500;
        var heightSmall = 140;
        var chartWidth = width - margins.left - margins.right;
        var chartHeight = height - margins.top - margins.bottom;
        var chartHeightSmall = heightSmall - marginsSmall.top - marginsSmall.bottom;
        var yScaleArguments = [[2015, 2019],[0, 200]];

        var drawAnimation = "draw 3000ms ease-in 4ms forwards";

        // Select targetNodes and sourceNodes separately. For now, this is focused on source.
        window.updateGraphic = function(graphicSelector) {
          var stepNodesSource, stepNodesTarget, stepLinks, stepLabel, stepArrow;
          // function drawSankey(school, drawWidth, drawHeight, chartWidth, chartHeight, yScaleArguments, colorScale, nodes, links, container, number) {

          var steps = [
            function step0() {
              drawSankey.drawSankey("Universal Academy", width, heightSmall, chartWidth, chartHeightSmall, [[2017, 2020],[0, chartHeightSmall]], "school", nodes, links, graphicDiv, margins, 4);
              stepNodesSource = d3.selectAll(".node-source-4");
              stepNodesTarget = d3.selectAll(".node-target-4");
              stepLinks = d3.selectAll(".link-4");
              stepLabel = d3.selectAll(".display-label-4");
              stepArrow = d3.selectAll(".display-label-arrow-4");
              stepLinks.style("animation","none");
              stepNodesTarget.style("visibility", d => d.name.includes("Universal Academy") ? "visible" : "hidden");
              stepNodesSource.style("visibility", d => d.name.includes("Universal Academy") ? "visible" : "hidden");
              stepLabel.style("visibility", d => d.name.includes("Universal Academy") ? "visible" : "hidden");
              stepArrow.style("visibility", d => d.name.includes("Universal Academy") ? "visible" : "hidden");
            },
            function step1() {
              drawSankey.drawSankey("Universal Academy", width, height, chartWidth, chartHeight, [[2017, 2020],[0, chartHeight]], "school", nodes, links, graphicDiv, margins, 4);
              stepNodesSource = d3.selectAll(".node-source-4");
              stepNodesTarget = d3.selectAll(".node-target-4");
              stepLinks = d3.selectAll(".link-4");
              stepLabel = d3.selectAll(".display-label-4");
              stepArrow = d3.selectAll(".display-label-arrow-4");
              stepLabel.style("visibility", "visible");
              stepArrow.style("visibility", "visible");
              stepNodesTarget.style("visibility", "visible");
              stepNodesSource.style("visibility", d => d.name.includes("Universal Academy") ? "visible" : "hidden");
              stepLinks.style("animation",drawAnimation);
            },
            function step2() {

            },
            function step3() {

            },
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

        var graphicEl = d3.select('#graphic-container-4');
        var triggers = d3.selectAll('.trigger-4');
        var viewportHeight = window.innerHeight;
        var graphic = updateGraphic('#graphic-container-4');

        gs.graphScroll()
          .eventId('graphic-4')
          .container(graphicEl)
          .graph(graphicDiv)
          .sections(triggers)
          .offset(1)
          .on('active', function(i){ graphic.update(i); });

      }, 3000);

    } // end mounted
  } // end exports

</script>

<style scoped>
.scroll-note {
  margin-top: 1em;
  font-size: 0.8em;
  text-align: center;
  font-weight: 600;
  font-style: italic;
  color: rgb(23, 130, 135);
}
.graphic-left {
  height: 520px;
}
#graphic-container-4 {
  margin-bottom: 3em;
}
</style>
