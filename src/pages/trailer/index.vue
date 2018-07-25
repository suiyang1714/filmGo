<template lang="pug">
  .container
    .film__trailer
      .film__trailer--video
        video(:src="service + filmTrailer.trailerMP4", :poster="service + filmTrailer.trailerPoster")
      .film__trailer--intro
        .film--title {{ filmTrailer.trailerTitle }}
        .film--like
          text {{ film.like }}
            | 人喜欢看
        .film--releaseDate  {{ film.releaseDate }}
      .Film--title 播放列表（{{ filmTrailerList.length }}）
      .film__trailer--list
        .item(v-for="item in filmTrailerList", v-bind:key="item.trailerId")
          .item--left
            a(:href="'./main?trailerId=' + item.trailerId + '&filmId=' + film.id")
              img(:src="service + item.trailerPoster")
          .item--right
            .item--title {{ item.trailerTitle }}
            .item--date {{ item.trailerDate }}
            <!--.item&#45;&#45;pv {{ item.trailerPv }}-->

</template>

<script>
  // use Vuex

  export default {
    head: {
      title: '预告片'
    },
    data () {
      return {
        service: 'https://filmgoqiniu.adityasui.com/',
        filmTrailerList: [],
        filmTrailer: null,
        film: null
      }
    },
    async onShow  () {
      const filmId = this.$root.$mp.query.filmId
      const trailerId = this.$root.$mp.query.trailerId
      this.film = await this.$store.dispatch('fetchFilmTrailer', {filmId})
      this.filmTrailerList = []
      this.film.trailerArray.forEach(item => {
        if (item.trailerId === trailerId) {
          this.filmTrailer = item
        } else {
          this.filmTrailerList.push(item)
        }
      })
    },
    async beforeMount () {
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  .container {
    background-color: #f4f4f4;
  }
  .Film--title {
    background-color: #fff;
    padding: 20rpx;
    border-bottom: 1px solid #7f828b;
    font-size: 16px;
    color: #333;
  }
  .film__trailer {
    &--video {
      background-color: #fff;
      video {
        width: 100%;
        display: block;
      }
    }
    &--intro {
      background-color: #fff;
      line-height: 50rpx;
      font-size: 14px;
      color: #7f828b;
      margin-bottom: 20rpx;
      padding: 20rpx;
      .film--title {
        font-size: 18px;
        color: #333;
      }
      .film-like {
        text {
          color: #ff9900
        }
      }
    }
    &--list {
      background-color: #fff;
      padding: 20rpx;
      .item {
        display: flex;
        box-sizing: border-box;
        &--left {
          margin-right: 20rpx;
          img {
            width: 200rpx;
            height: 160rpx;
          }
        }
        &--right {
          flex: 3;
          font-size: 12px;
          color: #7f828b;
          .item--title {
            font-size: 16px;
            color: #333;
            height: 90rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
</style>
