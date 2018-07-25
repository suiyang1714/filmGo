<template lang="pug">
  .container
    .flim(v-if="!modelShow")
      .film__top
        .movie-background(:style="'background-image: url('+ service +film.postPic +')'")
        .movie-filter
        .film
          .film--left
            .film--left--poster
              a(v-if="film.trailerArray.length > 0", :href="'../trailer/main?trailerId=' + film.trailerArray[0].trailerId + '&filmId=' + film.id")
                img(:src="service + film.postPic")
              img(v-else="", :src="service + film.postPic")
          .film--right
            .film--right--title {{ film.title }}
            .film--right--aka {{ film.aka[film.aka.length - 1] }}
            .film--right--pv {{ film.like }}人喜欢看
            .film--right--genres
              text(v-for="(itemI, indexI) in film.genres", v-bind:key="indexI") {{ itemI.name }}
            .film--right--release
              p(v-for="(itemX, indexX) in film.releaseDate", v-bind:key="indexX") {{ itemX }}
            .film--right--runtime {{ film.runtime }}
      .film__middle
        .film--intro
          p {{ film.summary }}
        .Film--title 演职人员
        .film--casts
          .item(v-for="(item, index) in film.directors", v-bind:key="item.id")
            dl(v-if="item.id")
              dt
                img(:src="service + item.avatars")
              dd {{ item.name }}
          .item(v-for="(item, index) in film.casts", v-bind:key="item.id")
            dl
              dt
                img(:src="service + item.avatars")
              dd {{ item.name }}
        .Film--title(v-if="film.trailerArray.length > 0") 视频
        .film--trailer(v-if="film.trailerArray.length > 0")
          .item(v-for="(item, index) in film.trailerArray", v-bind:key="item.id")
            a(:href="'../trailer/main?trailerId=' + item.trailerId + '&filmId=' + film.id")
              dl()
                dt
                  img(:src="service + item.trailerPoster")
                dd.title {{ item.trailerTitle }}
                dd {{ item.trailerDate }}
        .Film--title(v-if="film.filmStagePhotos.length > 0") 剧照
        .film--stagePhoto(v-if="film.filmStagePhotos.length > 0")
          .item(v-for="(item, index) in film.filmStagePhotos", v-bind:key="item.id")
            img(:src="service + item", @click="thumbnail(index)")
    .model__window(v-if="modelShow", @click="modelCancel")
      <!--.model__window&#45;&#45;top-->
        <!--text {{ stagePhotoActive+1 }}/{{ film.filmStagePhotos.length }}-->
      .model__window--middle
        img(:src="service + filmStagePhotosLarge[stagePhotoActive]")

</template>

<script>
  export default {
    data () {
      return {
        service: 'https://filmgoqiniu.adityasui.com/',
        film: [],
        stagePhotoActive: 1,
        modelShow: false,
        filmStagePhotosLarge: []
      }
    },
    async onShow () {
      this.filmStagePhotosLarge = []
      const id = this.$root.$mp.query.id
      this.film = await this.$store.dispatch('fetchFilm', id)
      if (this.film.filmStagePhotos.length > 0) {
        this.film.filmStagePhotos.forEach(item => {
          this.filmStagePhotosLarge.push(item.replace(/.jpg/, 'Big.jpg'))
        })
      }
    },
    methods: {
      thumbnail (index) {
        this.stagePhotoActive = index
        this.modelShow = true
        console.log(this.modelShow)
      },
      modelCancel () {
        this.modelShow = false
      }
    }
  }
</script>

<style>
  page {
    height: 100%;
    width: 100%;
  }
</style>
<style lang="scss" scoped>
  .container {
    background-color: #f4f4f4;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .model__window {
    background-color: #000;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    /*&--top {
      color: #fff;
      text-align: center;
      padding: 20rpx;
    }*/
    &--middle {
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
  .Film--title {
    background-color: #fff;
    padding: 20rpx;
    /*border-bottom: 1px solid #7f828b;*/
    font-size: 16px;
    color: #333;
  }
  .film__top {
    color: #fff;
    padding: 30rpx;
    line-height: 1;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    -webkit-filter: blur(0);
    filter: blur(0);
    .film {
      display: flex;
      z-index: 1;
      position: relative;
      &--left {
        width: 218rpx;
        height: 304rpx;
        -webkit-filter: blur(0);
        border: solid 1px #f0f2f3;
        position: relative;
        margin-right: 20rpx;
        img {
          width: 218rpx;
          height: 304rpx;
        }
      }
      &--right {
        flex: 1;
        &--title {
          font-size: 34rpx;
          line-height: 68rpx;
          margin-top: 6rpx;
          margin-bottom: 10rpx;
        }
        &--aka {
          font-size: 22rpx;
          opacity: 0.8;
          height: 22rpx;
          margin-bottom: 12rpx;
        }
        &--pv {
          color: #ff9900;
          font-size: 32rpx;
          margin-bottom: 24rpx;
        }
        &--genres, &--release, &--runtime {
          opacity: 0.7;
          font-size: 24rpx;
          margin-bottom: 12rpx;
        }
      }
    }
    .movie-background {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      z-index: 0;
      position: absolute;
      filter: blur(60rpx);
      -webkit-filter: blur(60rpx);
      background-size: cover;
      background-repeat: no-repeat;
      background-position-y: 40%;
    }
    .movie-filter {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      position: absolute;
      background-color: #40454d;
      opacity: 0.55;
    }
  }
  .film__middle {
    .film--intro {
      background-color: #fff;
      font-size: 30rpx;
      line-height: 50rpx;
      padding: 30rpx;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 20rpx;
    }
    .film--casts {
      background-color: #fff;
      padding: 30rpx;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      white-space: nowrap;
      overflow-x: scroll;
      margin-bottom: 20rpx;
      display:flex;
      .item {
        display: inline-block;
        width: 135rpx;
        margin-right: 20rpx;
        dl {
          dt {
            img {
              width: 135rpx;
              height: 192rpx;
            }
          }
          dd {
            white-space: normal;
            text-align: center;
            font-size: 24rpx;
          }
        }
      }
    }
    .film--trailer {
      background-color: #fff;
      padding: 30rpx;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      white-space: nowrap;
      overflow-x: scroll;
      margin-bottom: 20rpx;
      display:flex;
      .item {
        display: inline-block;
        width: 270rpx;
        margin-right: 20rpx;
        dl {
          dt {
            img {
              width: 270rpx;
              height: 192rpx;
            }
          }
          dd {
            white-space: normal;
            text-align: center;
            font-size: 24rpx;
            &.title {
              height: 64rpx;
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
    .film--stagePhoto {
      background-color: #fff;
      padding: 30rpx;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      white-space: nowrap;
      overflow-x: scroll;
      margin-bottom: 20rpx;
      display: flex;
      .item {
        width: 230rpx;
        padding-right: 20rpx;
        img {
          width: 230rpx;
          height: 230rpx;
        }
      }
    }
  }

</style>
