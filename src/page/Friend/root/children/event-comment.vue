<template>
  <div class="event-comment">
    <comment-wrap :threadId="threadId" :haveData="comments.length>0||hotComments.length>0" @handleFold="handleFold">
      <comment-item></comment-item>
    </comment-wrap>
  </div>
</template>

<script>
import { mapState } from "vuex";
let _this = null;
export default {
  components: {
    "comment-wrap": () => import("./comment-wrap"),
    "comment-item": () => import("./comment-item")
  },
  props: {
    value: Boolean,
    threadId: {
      type: String,
      required: true
    }
  },
    
  created(){
    _this= this;
  },
  methods: {
    hideAction() {
      this.$emit("input", false);
    },
    //处理收起请求
    handleFold() {
      this.hideAction();
    }
  },
  computed: {
    ...mapState({
      comments: state => state.event.comments[_this.threadId]||[],
      hotComments: state => state.event.hotComments[_this.threadId]||[]
    })
   
  }
};
</script>

<style scoped lang="scss">
.event-comment {
  margin-left: 50px;
  margin-top: 12px;
}
</style>