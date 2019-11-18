<template>
  <div class="add-event">
    <my-window title="分享">
      <template slot="content">
        <div class="main">
          <div class="main-ipt">
            <textarea placeholder="一起聊聊吧~" :message="message"></textarea>
            <div class="choose">
              <div class="choose-main">
                <span>给动态配上音乐</span>
                <span></span>
              </div>
            </div>
          </div>
          <div class="main-func"></div>
          <div class="main-opa">
            <button class="share">分享</button>
            <button @click="cancelAction" class="cancel">取消</button>
          </div>
        </div>
      </template>
    </my-window>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canShare: false
    };
  },
  methods:{
        cancelAction(){
            this.$center.$emit("openWindow",false);
        }
  }
};
</script>

<style scoped lang="scss">
.add-event {
  .main {
    width: 448px;
    height: 258px;
    padding: 20px 40px 30px;
    &-ipt {
      border: 1px solid #ccc;
      textarea {
        height: 117px;
        padding: 5px 6px 6px;
        width: 100%;
        box-sizing: border-box;
        outline: none;
        border: 0;
        resize: none;
        font-size: 12px;
        color: #333;
      }
      .choose {
        width: 100%;
        height: 46px;
        cursor: pointer;
        &:hover {
          background: #fcfcfc;
        }
        &-main {
          width: 426px;
          height: 45px;
          line-height: 45px;
          border-top: 1px solid #ccc;
          margin: 0 auto;
        }
      }
    }
    &-func {
      height: 20px;
      margin-top: 10px;
    }
    &-opa {
      margin-top: 30px;

      button {
        border: 0;
        width: 80px;
        height: 31px;
        line-height: 31px;
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
        outline: none;
      }
      .share {
        color: #b6d3f1;

        background: #7fb0de;
      }
      .cancel {
        margin-left: 10px;
        &:hover{
            background: #eee;
        }
      }
    }
  }
}
</style>