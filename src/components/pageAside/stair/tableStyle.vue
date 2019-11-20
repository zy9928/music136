<template>
  <section class="tableStyleWrap">
    <slot />
    <div class="tableStyleCont" v-if="data_kind != 'singer'">
      <router-link class="userHead" v-for="(item, key) in dataValue" :key="key" :to="`/user/${item.userId}`">
        <img :src="item.userImg" :alt="item.userId" />
      </router-link>
    </div>
    <div class="tableStyleCont" v-if="data_kind == 'singer'">
      <router-link class="userHead singerHeader" v-for="(item, key) in dataValue" :key="key" :to="`/singer/${item.singerId}`">
        <div class="imgBox"><img :src="item.singerImg" :alt="item.singerName" /></div>
        <p>{{item.singerName}}</p>
      </router-link>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      dataValue: [],
    };
  },
  props: {
    data_kind: ""
  },
  computed: {
    ...mapState({
      songLikers: state => state.aside.songLikers,
      songListLikers: state => state.aside.songListLikers,
      similarSinger: state => state.aside.similarSinger,
      songId: state => state.aside.songId,
      songListId: state => state.aside.songListId,
      singerId: state => state.aside.singerId,
      
    }),
    id(){
      if(this.data_kind == "song"){
        return this.songId;
      }else if(this.data_kind == "songList"){
        return this.songListId;
      }else if(this.data_kind == "singer"){
        return this.singerId;
      }
    }
  },
  watch: {
    id(newVal, oldVal){
      this.getData();
    }
  },
  methods: {
    async getData(){ // 放入computed不加async就死循环
      if (this.data_kind == "song") {
        await this.$store.dispatch("aside/getSongLikers", { id: this.id});
        this.songLikers.splice(this.songLikers.length - 1, 1);
        this.dataValue = this.songLikers;
      } else if (this.data_kind == "songList") {
        await this.$store.dispatch("aside/getSongListLikers", {
          id: this.id,
          limit: 8
        });
        this.dataValue = this.songListLikers;
      }else if (this.data_kind == "singer"){
        await this.$store.dispatch("aside/getSimilarSinger", { id: this.id});
        this.dataValue = this.similarSinger.splice(0, 6);
      }
    }
  },
  mounted() {
    if(this.id){
      this.getData();
    }
  }
};
</script>

<style scoped lang="scss">
.tableStyleWrap {
  margin-bottom: 10px;
  overflow: hidden;
  .tableStyleCont {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .userHead{
      display: inline-block;
      padding: 5px 0;
      width: 50px;
      & img{
        width: 50px;
      }
      &>p{
        width: 100%;
        text-align: center;
        line-height: 20px;
      }
    }
    .singerHeader{
      width: 70px;
      .imgBox{
        width: 60px;
        height: 60px;
        overflow: hidden;
        margin: 0 auto;
        position: relative;
        &>img{
          width: auto;
          height: 60px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
}
</style>