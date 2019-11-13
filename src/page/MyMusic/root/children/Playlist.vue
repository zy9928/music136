<template>
  <div class="play-list">
    <div class="play-list-create">
      <span class="title">
        <i @click="hide('create',$event)" class="iconfont iconcc-arrowhead"></i>
        创建的歌单&nbsp;({{createNum}})
      </span>
      <a href>
        <i class="iconfont iconcc-add"></i>新建
      </a>
      <div ref="create" :class="{createHide:createHide}">
        <slot name="create" />
      </div>
    </div>
    <div class="play-list-collect">
      <span class="title">
        <i @click="hide('collect',$event)" class="iconfont iconcc-arrowhead"></i>
        收藏的歌单&nbsp;({{collectNum}})
      </span>
      <div ref="collect" :class="{collectHide:collectHide}">
        <slot class="collect" name="collect" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      createHide: false,
      collectHide: false
    };
  },
  name: "play-list",
  props: {
    createNum: Number,
    collectNum: Number
  },
  methods: {
    hide(type, e) {
      let target = e.target;
      console.log(target);
      if (type == "create") {
        if (this.createHide) {
          target.style.transform = "none";
        } else {
          target.style.transform = "rotate(-90deg)";
          //   target.style.display = "none";
        }
        this.createHide = !this.createHide;
      } else {
        if (this.collectHide) {
          target.style.transform = "none";
        } else {
          target.style.transform = "rotate(-90deg)";
        }
        this.collectHide = !this.collectHide;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.play-list {
  width: 240px;
  min-height: 628px;
  padding: 52px 0 0 0;
  background: #fff;
  border-left: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  .title {
    font-size: 16px;
    color: #282828;
    font-weight: bold;
    padding-left: 19px;
    line-height: 34px;
    .iconfont {
      padding-right: 2px;
      color: #ccc;
      cursor: pointer;
      display: inline-block;
    }
  }
  .createHide {
    display: none;
  }
  .collectHide {
    display: none;
  }
  .createRoate {
    transform: rotate(90deg);
  }
  .collectRoate {
    transform: rotate(90deg);
  }
  .play-list-create {
    a {
      display: inline-block;
      width: 50px;
      height: 20px;
      border: 1px solid #c3c3c3;
      border-radius: 5px;
      line-height: 20px;
      text-align: center;
      color: #515151;
      margin-left: 16px;
      font-size: 14px;
      .iconfont {
        font-size: 12px;
        padding-right: 5px;
        color: #c5412e;
      }
    }
  }
  .collect {
    // display: none;
  }
}
</style>