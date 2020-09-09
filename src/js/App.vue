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

  const RSS_URL = `https://detroit.chalkbeat.org/rss/front-page/index.xml`;

  fetch(RSS_URL)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const items = data.querySelectorAll("entry");
    var articleGroup = document.createElement("Div");
    var articleHeader = document.createElement("H3");
    articleHeader.innerHTML = "The Latest";
    articleGroup.appendChild(articleHeader);
    articleGroup.classList.add("article-group");

    for(var i=0; i < 5; i++){
      var el = items[i];
      console.log(el);
      var article = document.createElement("Article");
      var title = document.createElement("A");
      var byline = document.createElement("Div");
      title.innerHTML = el.querySelector("title").innerHTML;
      title.href = el.querySelector("id").innerHTML;
      // byline.innerHTML = "By" + el.querySelector("author").innerHTML;
      article.appendChild(title);
      // article.appendChild(byline);
      articleGroup.appendChild(article);
    }

    document.getElementById("app").appendChild(articleGroup);
  });

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
