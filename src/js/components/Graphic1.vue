<template>
  <div id="graphic-container-1" class="text-container">
    <div v-for="step in copy.graphic1" v-html="md(step.value)"></div>
    <div id="graphic-1">
      <div id="national"></div>
      <div id="statewide"></div>
    </div>
    <p class="note">Note: The most recent <a href="https://www.documentcloud.org/documents/7230047-Teacher-Mobility-Brief-Final-2017-09-18-v2-Ada#document/p6/a2024218">National teacher turnover data</a> is from 2012-13. The Michigan retention rate was calculated by Chalkbeat using 2018-19 teacher certification data.</p>
  </div>
</template>

<script>
  var d3 = require("d3");
  var md = require("markdown-it")();
  var sankey = require("../sankey.js");
  var drawSankey = require("../drawMiniSankeys.js");
  var links = require("../data/links.sheet.json");
  var nodes = require("../data/nodes.sheet.json");

  module.exports = {
    name: 'graphic-1',
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
      var graphicDiv = d3.select('#graphic-1');
      var national = d3.select('#national');
      var statewide = d3.select('#statewide');
      var margins = { top: 24, right: 40, bottom: 28, left: 0 };
      var height = 250;
      var chartHeight = height - margins.top - margins.bottom;
      var drawAnimation = "draw 3000ms ease-in 4ms forwards";

      function draw() {
        var width = graphicDiv.node().clientWidth/2;
        var chartWidth = width - margins.left - margins.right;
        var stepNodes, stepLinks;
        drawSankey.drawSankey("National_Teacher_Turnover_(12-13)_General", width, height, chartWidth, chartHeight, nodes, links, national, margins, 1);
        drawSankey.drawSankey("Michigan_Teacher_Turnover_(18-19)_General", width, height, chartWidth, chartHeight, nodes, links, statewide, margins, 1);
        stepLinks = d3.selectAll(".link-1");
        stepLinks.style("animation",drawAnimation);
      }
      draw();
      // window.addEventListener("resize", draw);
    } // end mounted
  } // end exports

</script>

<style scoped>
  #graphic-1 {
    display: flex;
    margin: auto;
  }
  .display-label {
    display: block;
    position: relative;
    padding-right: 0;
  }
</style>
