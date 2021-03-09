<template>
  <div>
    <div class="app-intro-content">
      <h2 class="app-title" v-html="md(copy.headline)"></h2>
      <div class="byline-wrapper">
        <div class="byline" v-html="md(copy.byline)"></div>
        <div class="date">{{ date }}</div>
      </div>
      <div class="social-container">
        <a class="social-button" href="">
          <div class="social-icon-container">
            <svg version="1.1" id="icon-facebook" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
            	 y="0px" viewBox="0 0 9.2 19" style="enable-background:new 0 0 9.2 19;" xml:space="preserve">
            <path d="M2.4,19v-8.9H0V6.9h2.4V4.1C2.4,2,3.7,0,7,0c1.3,0,2.3,0.1,2.3,0.1l-0.1,3c0,0-1,0-2,0c-1.2,0-1.3,0.5-1.3,1.4v2.3h3.5
            	l-0.2,3.2H5.8V19L2.4,19L2.4,19z"/>
            </svg>
          </div>
        </a>
        <a class="social-button" href="">
          <div class="social-icon-container">
            <svg version="1.1" id="icon-twitter" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
            	 y="0px" viewBox="0 0 21 17" style="enable-background:new 0 0 21 17;" xml:space="preserve">
            <path d="M21,2c-0.8,0.3-1.6,0.6-2.5,0.7c0.9-0.5,1.6-1.4,1.9-2.4c-0.8,0.5-1.8,0.9-2.7,1C16.9,0.5,15.8,0,14.5,0
            	c-2.4,0-4.3,1.9-4.3,4.3c0,0,0,0,0,0c0,0.3,0,0.7,0.1,1C6.8,5.1,3.6,3.5,1.5,0.9C1.1,1.5,0.9,2.2,0.9,3c0,1.5,0.8,2.8,1.9,3.6
            	C2.1,6.5,1.5,6.3,0.9,6v0c0,2.1,1.5,3.8,3.5,4.2c-0.4,0.1-0.8,0.1-1.1,0.1c-0.3,0-0.5,0-0.8-0.1c0.5,1.7,2.1,3,4,3
            	c-1.5,1.2-3.3,2-5.3,2c-0.3,0-0.7,0-1-0.1C1.9,16.5,4.2,17,6.6,17c7.9,0,12.2-6.6,12.2-12.2V4.2C19.7,3.6,20.4,2.9,21,2"/>
            </svg>
          </div>
        </a>
      </div>
    </div>
    <div class="text-container"><p v-for="p in copy.text1" v-html="md(p.value)"></p></div>
    <Graphic1 :copy=copy></Graphic1>
    <div class="text-container"><p v-for="p in copy.text2" v-html="md(p.value)"></p></div>
    <Graphic2 :copy=copy></Graphic2>
    <div class="text-container"><p v-for="p in copy.text3" v-html="md(p.value)"></p></div>
    <!-- <Graphic3 :copy=copy></Graphic3>
    <h3 v-html="md(copy.header1)" class="text-container"></h3>
    <div class="text-container"><p v-for="p in copy.text4" v-html="md(p.value)"></p></div>
    <h3 v-html="md(copy.header2)" class="text-container"></h3>
    <div class="text-container"><p v-for="p in copy.text5" v-html="md(p.value)"></p></div>
    <Graphic4 :copy=copy></Graphic4>
    <div class="text-container"><p v-for="p in copy.text6" v-html="md(p.value)"></p></div>
    <Graphic5 :copy=copy></Graphic5>
    <div class="text-container"><p v-for="p in copy.text7" v-html="md(p.value)"></p></div>
    <h3 v-html="md(copy.header3)" class="text-container"></h3>
    <div class="text-container"><p v-for="p in copy.text8" v-html="md(p.value)"></p></div>
    <h3 v-html="md(copy.header4)" class="text-container"></h3>
    <div class="text-container"><p v-for="p in copy.text9" v-html="md(p.value)"></p></div>
    <h3 v-html="md(copy.header5)" class="text-container"></h3>
    <div class="text-container"><p v-for="p in copy.text10" v-html="md(p.value)"></p></div>
    <h3 v-html="md(copy.header6)" class="text-container"></h3>
    <div class="text-container"><p v-for="p in copy.text11" v-html="md(p.value)"></p></div>
    <Graphic6 :copy=copy></Graphic6>
    <div class="text-container"><p v-for="p in copy.text12" v-html="md(p.value)"></p></div>
    <h3 v-html="md(copy.header7)" class="text-container"></h3>
    <div class="text-container"><p v-for="p in copy.text13" v-html="md(p.value)"></p></div> -->
  </div>
</template>

<script>
  var archieml = require("archieml");
  var md = require("markdown-it")();
  var moment = require('moment');
  require('moment-timezone');
  var now = moment().tz('America/New_York').format("MMM, D, YYYY, h:mm z");
  var date = now;
  var copy = require("./data/copy.docs.txt");
  copy = archieml.load(copy);
  var Graphic1 = require('./components/Graphic1.vue');
  var Graphic2 = require('./components/Graphic2.vue');
  var Graphic3 = require('./components/Graphic3.vue');
  var Graphic4 = require('./components/Graphic4.vue');
  var Graphic5 = require('./components/Graphic5.vue');
  var Graphic6 = require('./components/Graphic6.vue');

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
      var article = document.createElement("Article");
      var title = document.createElement("A");
      var byline = document.createElement("Div");
      title.innerHTML = el.querySelector("title").innerHTML;
      title.href = el.querySelector("id").innerHTML;
      article.appendChild(title);
      articleGroup.appendChild(article);
    }

    document.getElementById("app").appendChild(articleGroup);
  });

  module.exports =  {
    name: 'app',
    data(){ return {
      copy: copy,
      date: date,
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
      Graphic1,
      Graphic2,
      Graphic3,
      Graphic4,
      Graphic5,
      Graphic6
    },
  }
</script>

<style scoped></style>
