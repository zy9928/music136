<template>
  <div class="albumInfoBox">
    <section class="infoMain">
      <aside class="infoImg">
        <div class="imgBox">
          <img :src="dataAlbum.img" :alt="dataAlbum.name" />
          <span class="imgBg"></span>
        </div>
      </aside>
      <div class="infoText">
        <h5 class="infoTitle">
          <span>专辑</span>
          {{dataAlbum.name}}
        </h5>
        <ul class="authorInfoBox">
          <li>
            歌手：
            <router-link
              v-for="(item, key) in dataAlbum.singers"
              :key="key"
              :to="`/singer/${item.id}`"
            >{{item.name}}</router-link>
          </li>
          <li>发行时间：{{dataAlbum.time}}</li>
          <li v-if="dataAlbum.company">发行公司：{{dataAlbum.company}}</li>
        </ul>
        <slot />
      </div>
    </section>
    <section class="descriptionBox" :class="{textCtrlBoxHid: isHid}" >
      <span>专辑介绍：</span>
      <p class="description" v-html="dataAlbum.description"  ref="description"></p>
    </section>
    <p class="textCtrlBox" v-if="isHidBtn">
      <span class="textCtrl" @click="ctrlHid">展开<i :class="{'el-icon-arrow-down': isHid, 'el-icon-arrow-up': !isHid}"></i></span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHid: true,
      boxHight: null
    };
  },
  props: {
    dataAlbum: {},
    dataSongs: Array
  },
  computed: {
    isHidBtn(){
      if(this.boxHight > 300){
        return true;
      }else{
        return false;
      }
    }
  },
  methods: {
    ctrlHid(){
      this.isHid = !this.isHid;
    }
  },
  mounted() {
    console.log(this.$refs.description.offsetHeight);
    this.boxHight = this.$refs.description.offsetHeight;
  },
  updated() {
    console.log(this.$refs.description.offsetHeight);
    this.boxHight = this.$refs.description.offsetHeight;
  }
};
</script>

<style scoped lang="scss">
.albumInfoBox {
  .infoMain {
    overflow: hidden;
    .infoImg {
      width: 208px;
      float: left;
      .imgBox {
        width: 208px;
        height: 205px;
        position: relative;
        & > img {
          width: 177px;
          height: 177px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        .imgBg {
          position: absolute;
          width: 100%;
          height: 177px;
          top: 50%;
          transform: translateY(-50%);
          background: url(./../../../assets/zy_coverall.png) no-repeat 0 -986px;
        }
      }
    }
    .infoText {
      float: left;
      width: 429px;
      padding: 0 0 0 25px;
      box-sizing: border-box;
      margin-bottom: 30px;
      .infoTitle {
        font-size: 24px;
        line-height: 24px;
        width: 100%;
        box-sizing: border-box;
        position: relative;
        padding-left: 68px;
        & > span {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          width: 59px;
          height: 26px;
          background: url(./../../../assets/cc-tag.png) no-repeat 0 0;
          color: #fcf0f0;
          line-height: 26px;
          box-sizing: border-box;
          padding-left: 10px;
        }
      }
    }
    .authorInfoBox {
      padding: 20px 0;
      & > li {
        line-height: 20px;
        color: #666;
        & > a {
          color: #0c73c2;
        }
      }
    }
  }
  .descriptionBox {
    overflow: hidden;
    & > span {
      font-weight: bold;
    }
    .description {
      color: #666;
      line-height: 24px;
    }
  }
  .textCtrlBoxHid {
    max-height: 214px;
  }
  .textCtrlBox{
    color: #0C73C2;
    text-align: right;
  }
}
</style>