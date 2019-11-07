
<template>
  <div class="window">
    <div class="window-main" :style="{width:windowWidth}">
      <div class="window-main-header">
        <h3>{{title}}</h3>
        <span @click="closeAction">X</span>
      </div>
      <div class="window-main-content">
        <slot name="content" />
      </div>
      <div class="window-main-bottom" v-if="haveBottom">
        <a href="javascript:void(0)" @click="handleLeft" class="window-main-bottom-left">{{bTextLeft}}</a>
        <a href="javascript:void(0)" @click="handleRight" class="window-main-bottom-right">{{bTextRight}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    height: String,
    'bText-left': {
      type: String,
      default: ""
    },
    'bText-right': {
      type: String,
      default: ""
    },
    haveBottom: Boolean,
    windowWidth: String
  },
  name: "my-window",
  methods: {
    closeAction() {
      this.$center.$emit("openWindow", false);
    },
    handleLeft(){
      this.$emit('leftAction');
    },
    handleRight(){
      this.$emit('rightAction');
    }
  }
};
</script>

<style scoped>
.window {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}
.window-close {
  background: rgba(0, 0, 0, 0.3);
}
.window-main {
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  border: 1px solid #000;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.window-main-header {
  height: 38px;
  padding-right: 18px;
  margin: 0;
  height: 38px;
  line-height: 38px;
  padding-left: 18px;
  border-radius: 3px 3px 0 0;
  font-weight: bold;
  font-size: 14px;
  color: #fff;
  background: #2d2d2d;
}

.window-main-header h3 {
  float: left;
}
.window-main-header span {
  float: right;
  cursor: pointer;
}
.window-main-content {
  border: 1px solid #878787;
  background: #fff;
}

.window-main-bottom {
  padding: 0 19px;
  height: 48px;

  border-radius: 0 0 4px 4px;
  line-height: 48px;
  background-color: #f7f7f7;
  border: 1px solid #878787;
  border-top: 1px solid #c6c6c6;
}

.window-main-bottom-left {
  float: left;
  color: #0c72c3;
}
.window-main-bottom-right {
  float: right;
  color: #999;
}
</style>