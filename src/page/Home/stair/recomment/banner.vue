<template>
  <div class="banner">
    <div class="swiper-container" ref="container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, index) in this.bannerArr"
          :key="index">
          <img :src="item.bannerUrl" alt="轮播图" class="img" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 0,
      bannerArr: []
    };
  },
  mounted() {
    this.getHomeBanner().then(() => {
      var mySwiper = new Swiper(this.$refs.container, {
        direction: "horizontal", // 垂直切换选项
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: ".swiper-pagination",
        paginationClickable: true,

        // 如果需要前进后退按钮
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev"
      });
    });
  },
  methods: {
    async getHomeBanner() {
      let { data: result } = await this.$store.dispatch("home/getBannerData", {
        type: this.type
      });
      // console.log(result);
      result.banners.map(item => {
        let obj = {
          bannerUrl: item.imageUrl
        };
        this.bannerArr.push(obj);
      });
      // console.log(this.bannerArr);
    }
  }
};
</script>

<style scoped lang="scss">
.banner {
  width: 100%;
  height: 284px;
  .swiper-container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    .swiper-wrapper {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      .swiper-slide {
        width: 100%;
        height: 100%;
        .img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.swiper-container {
  z-index: 0;
}
</style>
