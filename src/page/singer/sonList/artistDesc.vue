<template>
<div class="desc">
  <h3 class="name"><i></i>简介</h3>
  <p class="intro">{{this.briefDesc}}</p>
  <div class="con" v-for='(item,index) in this.introduction' :key='index'>
    <h4 class="tit">{{item.ti}}</h4>
    <p class="titCon">{{item.txt}}</p>
  </div>
</div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  data(){
    return {
      // id: 12085569
      // id: 6452,
      briefDesc: '',
      introduction: [],

    }
  },
  computed: {
    ...mapState({
      singerId: state => state.aside.singerId,
    }),
    id(){
      return this.singerId;
    },
  },
  //更新页面
  watch: {
    id(newVal, oldVal){
      this.getArtistAlbum();
    }
  },
  mounted(){
    this.getArtistDesc();
  },
  methods:{
    async getArtistDesc(){
      let {data: result} = await this.$store.dispatch('artist50/getArtistDesc',{id: this.id});
      console.log(result);
      this.briefDesc = result.briefDesc;
      this.introduction = result.introduction;
    }
  }
}
</script>

<style scoped lang='scss'>
.desc {
  padding: 20px 0;
  .name {
    font-size: 14px;
    color: #222;
    font-weight: 600;
  }
  .intro {
    color: #555;
  }
  .con {
    margin: 30px 0;
    .tit {
      color: #222;
      font-size: 14px;
      padding: 10px 0;
      font-weight: 600;
    }
    .titCon {
      color: #555;
    }
  }
}
</style>