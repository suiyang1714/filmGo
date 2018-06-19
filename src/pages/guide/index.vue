<template lang="pug">
  .container
    h1 近期最受欢迎
    .swiper__block
      .flex
        .swiper__item(v-for="(item, index) in popularFilms", v-bind:key="item.id")
          .swiper__item--poster
            a(:href="'../film/main?id='+item.id")
              img(:src="item.postPic")
          .swiper__item--title {{ item.title }}
          .swiper__item--pv {{ item.pv }}人想看
          .swiper__item--release {{ item.releaseDate }}
    ul.comingsoonList
      li.item(v-for="(item, index) in comingSoonFilms", v-bind:key="item.id")
        div.item__moviePoster
          a(:href="'../film/main?id='+item.id")
            img(:src="item.postPic")
        div.item__movieIntro
          h1.item__movieIntro--title {{ item.title }}
          div.item__movieIntro--genres
            span(v-for="(itemI, indexI) in item.genres", v-bind:key="indexI") {{ itemI.name }}
          div.item__movieIntro--casts 主演：
            sapn(v-for="(itemV, indexV) in item.casts", v-bind:key="indexV")  {{ itemV.name }}
          div.item__movieIntro--release
            p(v-for="(itemX, indexX) in item.releaseDate", v-bind:key="indexX") {{ itemX }}
        div.item__handle
          div.flex-width.like
            span {{ item.pv }}
            |  人想看
          div
            button 想看
          div.flex-width

</template>

<script>
  // use Vuex
  import moment from 'moment'
  export default {
    data () {
      return {
        comingSoonFilms: [],
        popularFilms: [],
        scrollView: true
      }
    },
    async created () {
      this.comingSoonFilms = await this.$store.dispatch('fetchComingSoonFilms')
      this.comingSoonFilms.forEach(item => {
        if (item.pv > 100) {
          const str = item.releaseDate.reduce((prev, current) => {
            return prev + current
          })
          this.popularFilms.push({
            postPic: item.postPic,
            releaseDate: moment(str.match(/(.*?)\(中国大陆\)/)[1]).format('MM月DD日'),
            title: item.title,
            pv: item.pv,
            id: item.id
          })
        }
      })
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  .comingsoonList {
    padding: 0 20rpx;
  }
  .item {
    display: flex;
    margin-bottom: 10rpx;
    border-bottom: 1px solid #dbe1ec;
    &:last-child {
      border-bottom: none;
    }
    &__moviePoster {
      img {
        width: 135rpx;
        height: 192rpx;
      }
      margin-right: 20rpx;
    }
    &__movieIntro {
      flex: 1;
      font-size: 24rpx;
      line-height: 40rpx;
      color: #7f828b;
      &--title {
        font-size: 32rpx;
        color: #333;
        margin-bottom: 10rpx;
      }
      &--casts, &--genres, &--release {
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      &--genres span {
        margin-right: 10rpx;
      }
    }
    &__handle {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .like {
        font-size: 20rpx;
        color: orange;
        span {
          font-size: 30rpx;
        }
      }
      .flex-width {
        height: 40rpx;
      }
      button {
        width: 140rpx;
        height: 50rpx;
        line-height: 50rpx;
        border: 1px solid #f00;
        font-size: 24rpx;
        color: #f00;
        background: none;
        &:after {
          border: none;
        }
      }
    }
  }
  .swiper__block {
    margin: 0 20rpx;
    white-space: nowrap;
    overflow-y: scroll;
    .swiper__item {
      display: inline-block;
      width: 135rpx;
      margin-right: 20rpx;
      &--poster {
        img {
          width: 135rpx;
          height: 192rpx;
        }
      }
      &--title, &--pv, &--release {
        white-space: normal;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      font-size: 24rpx;
      line-height: 40rpx;
      color: #7f828b;
    }
  }
</style>
