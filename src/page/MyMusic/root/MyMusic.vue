<template>
  <div class="myMusic">
    <div class="view-wrap">
        <h1>我的音乐</h1>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import router from "../../../router";
import store from "../../../store";

export default {
  computed:{
    

  },

  beforeRouteEnter(to,from,next){
    console.log("进入我的音乐组件"); 
    if(!store.state.user.isLogin){
      router.push("/my");
    }else{
      next();
    }
  },
  
}
</script>

<style>

</style>