<template>
  <div class="add-event">
    <my-window title="分享">
      <template slot="content">
        <div class="main">
          <div class="main-ipt">
            <textarea placeholder="一起聊聊吧~" :message="message"></textarea>
            <div class="choose" @click="chooseMusic">
              <div class="choose-main">
                <p>
                  <span class="iconfont iconcc-music"></span>
                </p>
                <span>给动态配上音乐</span>
                <span class="iconfont iconcc-add"></span>
              </div>
            </div>
          </div>
          <div class="main-func">
            <span class="iconfont iconxiaolian"></span>
            <span class="iconfont iconaite"></span>
            <span class="iconfont iconcc-pic"></span>
          </div>
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
      canShare: false,
      message:''
    };
  },
  methods: {
    cancelAction() {
      this.$center.$emit("openWindow", false);
    },
    chooseMusic(){
      this.$center.$emit("changeWindow",'AddMusic');
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
          overflow: hidden;
          p {
            float: left;
            width: 30px;
            height: 30px;
            margin: 8px 8px 0 0;
            line-height: 30px;
            text-align: center;
            color: #fff;
            background: #d33a31;
            .iconfont {
              font-size: 18px;
            }
          }
          span {
            font-size: 14px;
          }
          .iconcc-add {
            font-size: 12px;
            float: right;
          }
        }
      }
    }
    &-func {
      height: 20px;
      margin-top: 10px;
      span{
          margin-right: 10px;
      }
      .iconfont{
          color: #bababa;
          font-size:18px;
          cursor: pointer;
      }
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
        &:hover {
          background: #eee;
        }
      }
    }
  }
}
</style>