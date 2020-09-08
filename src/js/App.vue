<template>
  <div>
    <div class="app-intro-content">
      <h2 class="app-title" v-html="md(copy.headline)"></h2>
      <div class="byline-wrapper">
        <div class="byline" v-html="md(copy.byline)"></div>
        <div class="date">{{ new Date(0) }}</div>
      </div>
      <!-- <div class="social">Social</div> -->
    </div>
    <div class="text-container">
      <p v-for="p in copy.top">{{ p }}</p>
    </div>
    <Graphic :copy=copy></Graphic>
  </div>
</template>

<script>
  var archieml = require("archieml");
  var md = require("markdown-it")();
  var copy = require("./data/copy.docs.txt");
  copy = archieml.load(copy);
  var Graphic = require('./components/Graphic.vue');
  module.exports =  {
    name: 'app',
    data(){ return {
      copy: copy,
    } },
    methods: {
      triggerComponent: function(view) {
        this.currentView = view;
      },
      md: function(input) {
        return md.render(input);
      },
      mdInline: function(input) {
        return md.renderInline(input);
      }
    },
    components: {
      Graphic
    },
  }
</script>

<style scoped></style>
