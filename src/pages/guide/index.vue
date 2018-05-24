<template lang="pug">
  .container
    | movie
    ul
      li(v-for="(item, index) in comingSoonFilms", v-bind:key="item.id")
        p {{ item.title }}
        p {{ item.year }}
        p
          <!--img(:src="item.images.small")-->
        dl
          dd(v-for="(itemI, indexI) in  item.genres", :key="index") {{ itemI.name }}

</template>

<script>
  // use Vuex

  export default {
    data () {
      return {
        comingSoonFilms: []
      }
    },
    async created () {
      this.comingSoonFilms = await this.$store.dispatch('fetchComingSoonFilms')
      console.log(this.comingSoonFilms)
    },
    methods: {

    }
  }
</script>

<style>

</style>
