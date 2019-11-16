<template>
  <div class="event-comment">
    <comment-wrap :threadId="threadId" :haveData="haveData" @handleFold="handleFold">
      <comment-item></comment-item>
    </comment-wrap>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
      comments: state => state.event.comments,
      hotComments: state => state.event.hotComments
    }),
    haveData(){
      console.log(1);
      if(this.comments[this.threadId]&&this.comments[this.threadId].length>0){
        return true;
      }else{
        return false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.event-comment {
  margin-left: 50px;
  margin-top: 12px;
}
</style>