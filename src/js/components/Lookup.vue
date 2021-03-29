<template>
  <div id="graphic-container-5">
    <form id="userSearchForm" class="autocomplete" autocomplete="off">
      <input id="userSearch" type="search" name="userInput" placeholder="Look up a school's teacher retention">
      <input type="submit">
    </form>
    <div id="input-error" class="input-error"></div>
    <div class="graphic" id="table-graphic"></div>
    <p class="note">Source: Center for Educational Information and Performance teacher retention database. <br> Note: This data is calculated differently than our analysis so figures do not quite align.</p>
  </div>
</template>

<script>
  var d3 = require("d3");
  const gs = require("graph-scroll");
  var md = require("markdown-it")();
  var data = require("../data/retention.sheet.json");
  var COLORS = require("../lib/colors.js");
  var autocomplete = require("../autocomplete.js");
  var autocomplete = autocomplete.autocomplete;
  var names = [];
  var keys, input, div, error, table, body;
  var base = "Statewide";

  module.exports = {
    name: 'graphic-5',
    props: ['copy'],
    data(){ return {
      data: data,
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
      var graphicDiv = d3.select('#graphic-container-5');
      var margins = { top: 60, right: 15, bottom: 20, left: 50 };
      var width = graphicDiv.node().clientWidth;
      var height = 500;
      var chartWidth = width - margins.left - margins.right;
      var chartHeight = height - margins.top - margins.bottom;

      //Format graphic data for processing by D3.
      var getSearchNames = function() {
        data.forEach(function(d) {
          names.push(d.School)
        });
        names = [... new Set(names)];
      };

      getSearchNames();
      keys = Object.keys(data[0]);
      form = document.getElementById("userSearchForm");
      input = document.getElementById("userSearch");
      div = document.getElementById("table-graphic");
      error = document.getElementById("input-error");
      autocomplete(input, names);

      // Create the table using for each to add rows
      table = document.createElement("TABLE");
      body = table.createTBody();
      var header = table.createTHead();
      var headerRow = header.insertRow(0);
      for(i=0; i<keys.length; i++) {
        var cell = headerRow.insertCell(-1);
        cell.innerHTML = keys[i];
      }

      div.appendChild(table);

      var render = function(e) {

        if(e) {
          if(e.type == "submit") {
            e.preventDefault();
          }
        }

        setTimeout(function() {
          val = input.value;
          if(val != "") {
            filter = data.filter(d => (d.School.toUpperCase() == val.toUpperCase()) | (d.School.toUpperCase() == base.toUpperCase()));
            if(filter[0]) {
              body.innerHTML = "";
              error.innerHTML = "";
              for(i=0; i<filter.length; i++) {
                var row = body.insertRow(0);
                for(a=0; a<keys.length; a++) {
                  var cell = row.insertCell(-1);
                  cell.setAttribute("data-title",keys[a])
                  cell.innerHTML = filter[i][keys[a]];
                }
              }
              table.classList.remove("hide");
              error.style.display = "none";
            } else {
              table.classList.add("hide");
              error.innerHTML = "Hmm we couldn't find that. Try searching something else.";
              error.style.display = "block";
            }
          } else {
            if(base) {
              filter = data.filter(d => d.School.toUpperCase() == base.toUpperCase());
              body.innerHTML = "";
              error.innerHTML = "";
              for(i=0; i<filter.length; i++) {
                var row = body.insertRow(0);
                for(a=0; a<keys.length; a++) {
                  var cell = row.insertCell(-1);
                  cell.setAttribute("data-title",keys[a])
                  cell.innerHTML = filter[i][keys[a]];
                }
              }
              table.classList.remove("hide");
              error.style.display = "none";
            } else {
              table.classList.add("hide");
              error.innerHTML = "";
              error.style.display = "none";
            }
          }

        }, 1000);

      }

      render();
      form.addEventListener("submit", render);
      input.addEventListener("change", render);
      window.addEventListener("resize", render);


    } // end mounted
  } // end exports

</script>

<style scoped>
#graphic-container-5 {
  margin-top: 3em;
}
#table-graphic {
  margin-bottom: 1em;
}
</style>
