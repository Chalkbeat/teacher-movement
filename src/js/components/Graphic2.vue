<template>
  <div id="graphic-container-2">
    <!-- <div class="scroll-note note">Scroll using your mouse to continue reading.</div> -->
    <div class="graphic-left" id="graphic-2">
      <div class="display-label-group" id="label-group-1">
        <div class="display-label">Detroit</div>
        <div class="display-label">Flint</div>
        <div class="display-label">Benton Harbor</div>
      </div>
      <div class="mini-group">
        <div id="detroit"></div>
        <div id="flint"></div>
        <div id="benton-harbor"></div>
      </div>
      <div class="display-label-group" id="label-group-2">
        <div class="display-label">Charter teachers</div>
        <div class="display-label">Traditional teachers</div>
        <div class="display-label"></div>
      </div>
      <div class="mini-group">
        <div id="charter"></div>
        <div id="traditional"></div>
      </div>
      <div class="display-label-group" id="label-group-3">
        <div class="display-label">Grosse Pointe Park</div>
        <div class="display-label">Bloomfield Hills</div>
        <div class="display-label">Saint Joseph</div>
      </div>
      <div class="mini-group">
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

  module.exports = {
    name: 'graphic-2',
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
      var graphicDiv = d3.select('#graphic-2');
      var labels1 = d3.select('#label-group-1');
      var labels2 = d3.select('#label-group-2');
      var labels3 = d3.select('#label-group-3');
      var charter = d3.select('#charter');
      var traditional = d3.select('#traditional');
      var detroit = d3.select('#detroit');
      var flint = d3.select('#flint');
      var battleCreek = d3.select('#battle-creek');
      var bentonHarbor = d3.select('#benton-harbor');
      var grossePointePark = d3.select('#grosse-pointe-park');
      var royalOak = d3.select('#royal-oak');
      var saintJoseph = d3.select('#saint-joseph');
      var margins = { top: 6, right: 14, bottom: 28, left: 10 };
      var width = graphicDiv.node().clientWidth/3;
      var height = 140;
      var chartWidth = width - margins.left - margins.right;
      var chartHeight = height - margins.top - margins.bottom;

      var drawAnimation = "draw 3000ms ease-in 4ms forwards";

      // Select targetNodes and sourceNodes separately. For now, this is focused on source.
      window.updateGraphic = function(graphicSelector) {
        var stepNodes, stepLinks;

        var steps = [
          function step0() {
            detroit.html("");
            flint.html("");
            bentonHarbor.html("");
            drawSankey.drawSankey("Detroit_General", width, height, chartWidth, chartHeight, nodes, links, detroit, margins, 2);
            drawSankey.drawSankey("Flint_General", width, height, chartWidth, chartHeight, nodes, links, flint, margins, 2);
            drawSankey.drawSankey("Benton_Harbor_General", width, height, chartWidth, chartHeight, nodes, links, bentonHarbor, margins, 2);
            stepLinks = d3.selectAll(".link-2");
            stepLinks.style("animation",drawAnimation);
            charter.html("");
            traditional.html("");
            labels2.style("display", "none");
            labels3.style("display", "none");
          },
          function step1() {
            drawSankey.drawSankey("Charter_Teachers", width, height, chartWidth, chartHeight, nodes, links, charter, margins, 2);
            drawSankey.drawSankey("Traditional_Teachers", width, height, chartWidth, chartHeight, nodes, links, traditional, margins, 2);
            stepLinks = d3.selectAll(".link-2");
            stepLinks.style("animation",drawAnimation);
            grossePointePark.html("");
            royalOak.html("");
            saintJoseph.html("");
            labels2.style("display", "flex");
            labels3.style("display", "none");
          },
          function step2() {
            drawSankey.drawSankey("Grosse_Pointe_Park_General", width, height, chartWidth, chartHeight, nodes, links, grossePointePark, margins, 2);
            drawSankey.drawSankey("Bloomfield_Hills_General", width, height, chartWidth, chartHeight, nodes, links, royalOak, margins, 2);
            drawSankey.drawSankey("Saint_Joseph_General", width, height, chartWidth, chartHeight, nodes, links, saintJoseph, margins, 2);
            stepLinks = d3.selectAll(".link-2");
            stepLinks.style("animation",drawAnimation);
            labels3.style("display", "flex");
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

      var graphicEl = d3.select('#graphic-container-2');
      var triggers = d3.selectAll('.trigger-2');
      var viewportHeight = window.innerHeight;
      var graphic = updateGraphic('#graphic-container-2');
      var step;

      gs.graphScroll()
        .eventId('graphic-2')
        .container(graphicEl)
        .graph(graphicDiv)
        .sections(triggers)
        .offset(1)
        .on('active', function(i){
          step = i;
          graphic.update(i);
        });

    } // end mounted
  } // end exports

</script>

<style scoped>
  .graphic-left .display-label {
    display: block;
    position: relative;
    padding-right: 0;
  }
  .mini-group {
    margin-bottom: 1em;
    display: flex;
  }
  .display-label-group {
    display: flex;
    padding-left: 10px;
    padding-right: 10px;
    justify-content: space-between;
    align-items: center;
  }
  .display-label {
    flex-grow: 1;
    width: 33%;
  }
  .scroll-note {
    margin-top: 1em;
    font-size: 0.8em;
    text-align: center;
    font-weight: 600;
    font-style: italic;
    color: rgb(23, 130, 135);
  }
  .graphic-left {
    height: 610px;
  }
</style>
