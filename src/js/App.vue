<template>
  <div>
    <div class="constrain-width">
      <div class="app-intro-content">
        <h2 class="app-title" v-html="md(copy.headline)"></h2>
        <div class="byline-wrapper">
          <div class="byline" v-html="md(copy.byline)"></div>
          <div class="date">Mar, 28, 2021, 8:16 EDT</div>
        </div>
        <div class="social-container">
          <a class="social-button" href="https://www.facebook.com/sharer/sharer.php?u=https://www.chalkbeat.org/e/22117370" target="_blank">
            <div class="social-icon-container">
              <svg version="1.1" id="icon-facebook" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
              	 y="0px" viewBox="0 0 9.2 19" style="enable-background:new 0 0 9.2 19;" xml:space="preserve">
              <path d="M2.4,19v-8.9H0V6.9h2.4V4.1C2.4,2,3.7,0,7,0c1.3,0,2.3,0.1,2.3,0.1l-0.1,3c0,0-1,0-2,0c-1.2,0-1.3,0.5-1.3,1.4v2.3h3.5
              	l-0.2,3.2H5.8V19L2.4,19L2.4,19z"/>
              </svg>
            </div>
          </a>
          <a class="social-button" href="https://twitter.com/intent/tweet?url=https://www.chalkbeat.org/e/22117370&text=A%20Chalkbeat%20analysis%20of%20more%20than%20one%20million%20rows%20of%20teacher%20workforce%20data%20sheds%20new%20light%20on%20the%20extent%20of%20the%20teacher%20movement%20in%20Michigan,%20how%20many%20students%20are%20affected,%20and%20the%20toll%20borne%20by%20students%20of%20color%20and%20students%20from%20low-income%20families." target="_blank">
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
      <Graphic2 :copy=copy></Graphic2>
      <div class="text-container"><p v-for="p in copy.text3" v-html="md(p.value)"></p></div>
      <h3 v-html="md(copy.header1)" class="text-container"></h3>
      <div class="text-container"><p v-for="p in copy.text4" v-html="md(p.value)"></p></div>
    </div>
    <FullImage :caption=imageData[0].caption :credit=imageData[0].credit :img=imageData[0].img :id=imageData[0].id></FullImage>
    <div class="constrain-width">
      <div class="text-container"><p v-for="p in copy.text5" v-html="md(p.value)"></p></div>
      <Graphic3 :copy=copy></Graphic3>
      <div class="text-container"><p v-for="p in copy.text6" v-html="md(p.value)"></p></div>
      <Lookup :copy=copy></Lookup>
      <h3 v-html="md(copy.header2)" class="text-container"></h3>
      <div class="text-container"><p v-for="p in copy.text7" v-html="md(p.value)"></p></div>
      <FullImage :caption=imageData[1].caption :credit=imageData[1].credit :img=imageData[1].img :id=imageData[1].id></FullImage>
      <div class="text-container"><p v-for="p in copy.text8" v-html="md(p.value)"></p></div>
      <h3 v-html="md(copy.header3)" class="text-container"></h3>
      <div class="text-container"><p v-for="p in copy.text9" v-html="md(p.value)"></p></div>
      <FullImage :caption=imageData[2].caption :credit=imageData[2].credit :img=imageData[2].img :id=imageData[2].id></FullImage>
      <div class="text-container"><p v-for="p in copy.text10" v-html="md(p.value)"></p></div>
      <FullImage :caption=imageData[3].caption :credit=imageData[3].credit :img=imageData[3].img :id=imageData[3].id></FullImage>
      <h3 v-html="md(copy.header4)" class="text-container"></h3>
      <FullImage class="small-image" :caption=imageData[4].caption :credit=imageData[4].credit :img=imageData[4].img :id=imageData[4].id></FullImage>
      <div class="text-container"><p v-for="p in copy.text11" v-html="md(p.value)"></p></div>
      <Graphic4 :copy=copy></Graphic4>
      <div class="text-container"><p v-for="p in copy.text12" v-html="md(p.value)"></p></div>

    </div>

  </div>
</template>

<script>
  var archieml = require("archieml");
  var md = require("markdown-it")();
  // var moment = require('moment');
  // require('moment-timezone');
  // var publishDate = moment("March 28, 2021 8:16:00").tz('America/New_York').format("MMM, D, YYYY, h:mm z");
  // var date = publishDate;
  var copy = require("./data/copy.docs.txt");
  copy = archieml.load(copy);
  var Graphic1 = require('./components/Graphic1.vue');
  var Graphic2 = require('./components/Graphic2.vue');
  var Graphic3 = require('./components/Graphic3.vue');
  var Graphic4 = require('./components/Graphic4.vue');
  var Lookup = require('./components/Lookup.vue');
  var FullImage = require('./components/FullImage.vue');
  var imageData = [
    {
      "caption": "Director of Instrumental Music Lamar A. Phillips poses for a portrait at Martin Luther King Jr. Senior High School in Detroit, Mich. Phillips is in his 26th year of teaching",
      "credit": "Nic Antaya for Crain's Detroit Business",
      "img": "./assets/Detroit_20210325_LamarPhillips_NicAntayaForCrain's_007A.jpg",
      "id": "image-1"
    },
    {
      "caption": "Phillips talks with his students over a virtual meeting at Martin Luther King Jr. Senior High School in Detroit, Mich.",
      "credit": "Nic Antaya for Crain's Detroit Business",
      "img": "./assets/Detroit_20210325_LamarPhillips_NicAntayaForCrain's_009A.jpg",
      "id": "image-2"
    },
    {
      "caption": "Music notes are written on a whiteboard in Phillips' classroom.",
      "credit": "Nic Antaya for Crain's Detroit Business",
      "img": "./assets/Detroit_20210325_LamarPhillips_NicAntayaForCrain's_012A.jpg",
      "id": "image-3"
    },
    {
      "caption": "Phillips left his last job at Detroit Merit Charter Academy due to low pay, lack of funding for the band program and poor scheduling.",
      "credit": "Nic Antaya for Crain's Detroit Business",
      "img": "./assets/Detroit_20210325_LamarPhillips_NicAntayaForCrain's_010A.jpg",
      "id": "image-4"
    },
    {
      "caption": "Idriss Saleh is a hardworking student, but he worries that teacher turnover at his school will hurt him in college.",
      "credit": "Courtesy Idriss Saleh",
      "img": "./assets/Idriss_Saleh.jpg",
      "id": "image-5"
    }
  ];

  document.onkeydown = function() {
    switch (window.event.keyCode) {
        case 40:
      		console.log('Down key is pressed');
          window.scrollBy(0,10);
        break;
    }
};

  const RSS_URL_1 = `https://detroit.chalkbeat.org/rss/teacher-turnover/index.xml`;
  const RSS_URL_2 = `https://detroit.chalkbeat.org/rss/front-page/index.xml`;

  pullRss(RSS_URL_1, "Next Up in Teacher Turnover");
  // pullRss(RSS_URL_2, "The Latest");

  function pullRss(feed, label) {
    fetch(feed)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      const items = data.querySelectorAll("entry");
      var articleGroup = document.createElement("Div");
      var articleHeader = document.createElement("H3");
      articleHeader.innerHTML = label;
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
  }


  module.exports =  {
    name: 'app',
    data(){ return {
      copy: copy,
      // date: date,
      imageData: imageData
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
      Lookup,
      FullImage
    },
  }
</script>

<style scoped></style>
