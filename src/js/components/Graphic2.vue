<template>
  <div id="graphic-container-2-2">
    <div id="tooltip-2"></div>
    <div class="graphic-left" id="graphic-2">
      <div>
        <div id="statewide"></div>
        <div id="detroit"></div>
      </div>
      <div>
        <div id="flint"></div>
        <div id="battle-creek"></div>
        <div id="benton-harbor"></div>
      </div>
      <div>
        <div id="grosse-pointe-park"></div>
        <div id="royal-oak"></div>
        <div id="saint-joseph"></div>
      </div>
    </div>
    <div class="graphic-right">
      <div class="trigger trigger-2" v-for="step in copy.graphic2" v-html="md(step.value)"></div>
    </div>
  </div>
</template>

<script>
  var d3 = require("d3");
  const gs = require("graph-scroll");
  var md = require("markdown-it")();
  var sankey = require("../sankey.js");
  var drawSankey = require("../drawMiniSankeys.js");
  var links = require("../data/links.sheet.json");
  var nodes = require("../data/nodes.sheet.json");
  var labels = require("../data/labels.sheet.json");

  module.exports = {
    name: 'graphic-2',
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
      var graphicDiv = d3.select('#graphic-2');
      var statewide = d3.select('#statewide');
      var detroit = d3.select('#detroit');
      var flint = d3.select('#flint');
      var battleCreek = d3.select('#battle-creek');
      var bentonHarbor = d3.select('#benton-harbor');
      var grossePointePark = d3.select('#grosse-pointe-park');
      var royalOak = d3.select('#royal-oak');
      var saintJoseph = d3.select('#saint-joseph');
      var margins = { top: 60, right: 10, bottom: 0, left: 10 };
      var width = graphicDiv.node().clientWidth/4;
      var height = 160;
      var chartWidth = width - margins.left - margins.right;
      var chartHeight = height - margins.top - margins.bottom;

      var drawAnimation = "draw 3000ms ease-in 4ms forwards";

      // Select targetNodes and sourceNodes separately. For now, this is focused on source.
      window.updateGraphic = function(graphicSelector) {
        var stepNodes, stepLinks;

        var steps = [
          function step0() {
            drawSankey.drawSankey("Statewide_General", width, height, chartWidth, chartHeight, nodes, links, statewide, 2);
            drawSankey.drawSankey("Detroit_General", chartWidth, chartHeight, chartWidth, chartHeight, nodes, links, detroit, 2);
            stepLinks = d3.selectAll(".link-2");
            stepLinks.style("animation",drawAnimation);
          },
          function step1() {
            drawSankey.drawSankey("Flint_General", chartWidth, chartHeight, chartWidth, chartHeight, nodes, links, flint, 2);
            drawSankey.drawSankey("Battle_Creek_General", chartWidth, chartHeight, chartWidth, chartHeight, nodes, links, battleCreek, 2);
            drawSankey.drawSankey("Benton_Harbor_General", chartWidth, chartHeight, chartWidth, chartHeight, nodes, links, bentonHarbor, 2);
            stepLinks = d3.selectAll(".link-2");
            stepLinks.style("animation",drawAnimation);
          },
          function step2() {
            drawSankey.drawSankey("Grosse_Pointe_Park_General", chartWidth, chartHeight, chartWidth, chartHeight, nodes, links, grossePointePark, 2);
            drawSankey.drawSankey("Bloomfield_Hills_General", chartWidth, chartHeight, chartWidth, chartHeight, nodes, links, royalOak, 2);
            drawSankey.drawSankey("Saint_Joseph_General", chartWidth, chartHeight, chartWidth, chartHeight, nodes, links, saintJoseph, 2);
            stepLinks = d3.selectAll(".link-2");
            stepLinks.style("animation",drawAnimation);
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

      var graphicEl = d3.select('#graphic-container-2-2');
      var triggers = d3.selectAll('.trigger-2');
      var viewportHeight = window.innerHeight;
      var graphic = updateGraphic('#graphic-container-2-2');

      gs.graphScroll()
        .container(graphicEl)
        .graph(graphicDiv)
        .sections(triggers)
        .offset(100)
        .on('active', function(i){ graphic.update(i); });

    } // end mounted
  } // end exports

</script>

<style>
  .graphic-left div {
    display: inline-block;
  }
</style>
