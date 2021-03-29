<template>
  <div id="graphic-container-3">
    <!-- <div class="scroll-note note">Scroll using your mouse to continue reading.</div> -->
    <div id="tooltip-3" class="tooltip"></div>
    <div class="graphic-left">
      <div id="graphic-3"></div>
      <div class="note">Click or hover on the graphic for more details.</div>
    </div>
    <div class="graphic-right">
      <div class="trigger trigger-3" v-for="step in copy.graphic3" v-html="md(step.value)"></div>
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
    name: 'graphic-3',
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
        var graphicDiv = d3.select('#graphic-3');
        var margins = { top: 60, right: 15, bottom: 20, left: 76 };
        var width = graphicDiv.node().clientWidth;
        // var width = 300;
        var height = 500;
        var chartWidth = width - margins.left - margins.right;
        var chartHeight = height - margins.top - margins.bottom;
        var yScaleArguments = [[2018, 2019],[0, chartHeight]];
        var stage = "statewide";

        var drawAnimation = "draw 3000ms ease-in 4ms forwards";

        // Select targetNodes and sourceNodes separately. For now, this is focused on source.
        window.updateGraphic = function(graphicSelector) {
          var stepNodesSource, stepNodesTarget, stepLinks, stepLabel, stepArrow, yearLabels;

          var steps = [
            function step0() {
              drawSankey.drawSankey("statewide_detail_1819", width, height, chartWidth, chartHeight, yScaleArguments, "city", nodes, links, graphicDiv, margins, 3);
              stepNodesSource = d3.selectAll(".node-source-3");
              stepNodesTarget = d3.selectAll(".node-target-3");
              stepLinks = d3.selectAll(".link-3");
              stepLabel = d3.selectAll(".display-label-3");
              stepArrow = d3.selectAll(".display-label-arrow-3");
              stepLabel.style("visibility", d => (d.display.includes("All charter") | d.display.includes("All traditional")) ? "visible" : "hidden");
              stepArrow.style("visibility", d => (d.display.includes("All charter") | d.display.includes("All traditional")) ? "visible" : "hidden");
              stepLinks.style("animation", d => (d.source_label == "Charter Fall 2018" & d.target_label == "Charter Fall 2019") |
                                                (d.source_label == "Traditional Fall 2018" & d.target_label == "Traditional Fall 2019") ?
                                                drawAnimation : "none");
              stepNodesSource.style("visibility", "visible");
              stepNodesTarget.style("visibility", d => (d.name == "Charter Fall 2019") | (d.name == "Traditional Fall 2019") ? "visible" : "hidden");
            },
            function step1() {
              stepLinks.style("animation", d => (d.source_label == "Charter Fall 2018" & d.target_label == "Charter Fall 2019") |
                                                (d.source_label == "Traditional Fall 2018" & d.target_label == "Traditional Fall 2019") ?
                                                drawAnimation : "none");
              stepNodesTarget.style("visibility", d => (d.name == "Charter Fall 2019") | (d.name == "Traditional Fall 2019") ? "visible" : "hidden");
            },
            function step2() {
              stepLinks.style("animation", d => (d.source_label == "Charter Fall 2018" & d.target_label == "Charter Fall 2019") |
                                                (d.source_label == "Traditional Fall 2018" & d.target_label == "Traditional Fall 2019") |
                                                (d.source_label == "Charter Fall 2018" & d.target_label == "Charter Different Fall 2019") |
                                                (d.source_label == "Traditional Fall 2018" & d.target_label == "Traditional Different Fall 2019") ?
                                                drawAnimation : "none");
              stepNodesTarget.style("visibility", d => (d.name == "Charter Fall 2019") |
                                                       (d.name == "Traditional Fall 2019") |
                                                       (d.name == "Charter Different Fall 2019") |
                                                       (d.name == "Traditional Different Fall 2019") ?
                                                       "visible" : "hidden");
            },
            function step3() {
              stepLabel.style("visibility", d => (d.display.includes("All charter") | d.display.includes("All traditional")) ? "visible" : "hidden");
              stepArrow.style("visibility", d => (d.display.includes("All charter") | d.display.includes("All traditional")) ? "visible" : "hidden");
              stepLinks.style("animation", d => (d.source_label == "Charter Fall 2018" & d.target_label == "Charter Fall 2019") |
                                                (d.source_label == "Traditional Fall 2018" & d.target_label == "Traditional Fall 2019") |
                                                (d.source_label == "Charter Fall 2018" & d.target_label == "Charter Different Fall 2019") |
                                                (d.source_label == "Traditional Fall 2018" & d.target_label == "Traditional Different Fall 2019") |
                                                (d.source_label == "Traditional Fall 2018" & d.target_label == "Charter Fall 2019") |
                                                (d.source_label == "Charter Fall 2018" & d.target_label == "Traditional Fall 2019") ?
                                                drawAnimation : "none");
            },
            function step4() {
              if (stage == "detroit") {
                stage = "statewide";
                graphicDiv.html("");
                drawSankey.drawSankey("statewide_detail_1819", width, height, chartWidth, chartHeight, yScaleArguments, "city", nodes, links, graphicDiv, margins, 3);
              }
              stepNodesSource = d3.selectAll(".node-source-3");
              stepNodesTarget = d3.selectAll(".node-target-3");
              stepLinks = d3.selectAll(".link-3");
              stepLabel.style("visibility", "visible");
              stepArrow.style("visibility", "visible");
              stepLinks.style("animation", drawAnimation);
              stepNodesTarget.style("visibility", "visible");
            },
            function step5() {
              graphicDiv.html("");
              drawSankey.drawSankey("detroit_detail_1819", width, height, chartWidth, chartHeight, yScaleArguments, "city", nodes, links, graphicDiv, margins, 3);
              stepNodesSource = d3.selectAll(".node-source-3");
              stepNodesTarget = d3.selectAll(".node-target-3");
              stepLinks = d3.selectAll(".link-3");
              stepLinks.style("visibility","visible");
              stepLinks.style("animation", drawAnimation);
              stepNodesSource.style("visibility", "visible");
              stepNodesTarget.style("visibility","visible");
              stage = "detroit";
            },
            function step6() {

            },
            function step7() {

            },
            function step8() {
              drawSankey.drawSankey("detroit_detail_1819_midyear", width, height, chartWidth, chartHeight, yScaleArguments, "city", nodes, links, graphicDiv, margins, 3);
              stepNodesSource = d3.selectAll(".node-source-3");
              stepNodesTarget = d3.selectAll(".node-target-3");
              stepLinks = d3.selectAll(".link-3");
              stepLinks.style("visibility","visible");
              stepLinks.style("animation", drawAnimation);
              stepNodesSource.style("visibility", "visible");
              stepNodesTarget.style("visibility","visible");
            },
            function step9() {

            },
          ]

          function update(step) {
            steps[step].call();
          }

          function setup() {

          }

          setup();

          return {
            update: update,
          }

        } // end update graphic function

        var graphicEl = d3.select('#graphic-container-3');
        var triggers = d3.selectAll('.trigger-3');
        // var viewportHeight = window.innerHeight;
        var graphic = updateGraphic('#graphic-container-3');
        let box = document.querySelector('#image-1');
        let imgHeight = box.clientHeight;

        gs.graphScroll()
          .eventId('graphic-3')
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
  height: 600px;
}
/* #graphic-container-3 {
  margin-bottom: 3em;
} */
</style>
