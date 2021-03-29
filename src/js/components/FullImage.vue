<template>
  <div class="full-image-container">
    <img :src=img>
    <div class="img-meta">
      <figcaption> {{ caption }} </figcaption>
      <cite> &nbsp;&nbsp; | &nbsp;&nbsp; {{ credit }} </cite>
    </div>
  </div>
</template>

<script>

  module.exports = {
    name: 'full-image',
    props: {
      caption: String,
      credit: String,
      img: String
    }
  } // end exports

</script>

<style scoped>


</style>
