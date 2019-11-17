<template>
  <div class="comment-wrap">
    <div class="comment-ipt">
      <textarea v-model="message" placeholder="评论" maxlength="140"></textarea>
      <div class="opa">
        <a href="#">
          <span class="iconfont iconxiaolian"></span>
        </a>
        <a href="#">
          <span class="iconfont iconaite"></span>
        </a>
        <a class="send" @click.prevent="sendAction" href="#">评论</a>
        <span>{{inputCount}}</span>
      </div>
      <div class="comment-list">
        <comment-list v-if="hotComments.length>0" title="精彩评论">
          <comment-item :item="item" v-for="item in hotComments" :key="item.id"></comment-item>
        </comment-list>
        <comment-list v-if="comments.length>0" title="最新评论">
          <comment-item :item="item" v-for="item in comments" :key="item.id"></comment-item>
        </comment-list>
      </div>
      <div class="fold" :class="{noborder:haveData}">
        <a @click.prevent="foldAction" href="#">
          <span class="text">收起</span>
          <span class="iconfont iconcc-up"></span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
let _this = null;
export default {
  props: {
    threadId: {
      type: String,
      required: true
    }
  },
  components: {
    "comment-item": () => import("./comment-item"),
    "comment-list": () => import("./comment-list")
  },
  data() {
    return {
      inputCount: 140,
      message: "",
      handleFold: Function,
      haveData: Boolean
    };
  },
  methods: {
    //发送评论
    async sendAction() {
      if(!this.message.trim()){
        alert("输入不能为空")
        return false;
      }
      let params = {
        t: 1,
        type: 6,
        threadId: this.threadId,
        content: this.message
      };

      try {
        let result = await this.$store.dispatch(
          "event/sendOrDelComment",
          params
        );
        let comment = result.data.comment;
        this.comments.unshift(comment);
        this.message = '';
        alert("评论成功");
      } catch (error) {
        console.error(error);
        alert("发送失败");
      }
    },
    //评论收起
    foldAction() {
      this.$emit("handleFold", false);
    },
    async getEventComment() {}
  },
  watch: {
    message() {
      this.inputCount = 140 - this.message.length;
    }
  },
  computed: {
    ...mapState({
      comments: state => state.event.comments[_this.threadId] || [],
      hotComments: state => state.event.hotComments[_this.threadId] || []
    })
  },
  created() {
    _this = this;
    //获取评论
    this.getEventComment()
      .then(result => {})
      .catch(err => {
        console.error(err);
        //   alert('获取失败')
      });
  }
};
</script>

<style scoped lang="scss">
.comment-wrap {
  padding: 15px;
  border: 1px solid #d9d9d9;
  background: #f8f8f8;
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px #fcfcfc;
  width: 535px;
  min-height: 152px;
  .comment-ipt {
    textarea {
      width: 100%;
      padding: 5px 6px 6px;
      color: #666;
      height: 50px;
      outline: none;
      font-size: 12px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      resize: none;
    }
    .opa {
      margin-top: 8px;
      height: 25px;
      line-height: 25px;
      overflow: hidden;
      a {
        float: left;
        .iconfont {
          font-size: 20px;
        }
      }
      span {
        float: right;
        margin-right: 8px;
        color: #ccc;
      }
      .send {
        width: 46px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        color: #fff;
        background: #3080cc;
        float: right;
      }
    }
    .fold {
      margin-top: 24px;
      padding-top: 18px;
      border-top: 1px dotted #ccc;
      color: #666;
      .iconfont {
        font-size: 12px;
      }
      .text {
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .noborder {
      border: 0;
    }
  }
}
</style>