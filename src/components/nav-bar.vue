<template>
  <div class="navBar">
    导航
    <nav>
      <!-- <li>
        <span>发现音乐</span>
        <ul>
          
        </ul>
      </li>
      <li>我的音乐</li>
      <li>朋友</li>-->
      <li v-for="(fistNav, fistKey) in navLi" :key="fistKey" @click="fistNavClc(fistNav.dataId)">
        <span>{{fistNav.title}}</span>
        <ul>
          <router-link
            v-for="(subNav, subKey) in fistNav.subNav"
            :key="subKey"
            :to="subNav.to"
          >{{subNav.title}}</router-link>
        </ul>
      </li>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navLi: [
        {
          title: "发现音乐",
          dataId: "1",
          to: "/home",
          subNav: [
            {
              title: "推荐",
              dataId: "11",
              to: "/home/recommend"
            },
            {
              title: "排行榜",
              dataId: "12",
              to: "/home/topList"
            },
            {
              title: "歌单",
              dataId: "13",
              to: "/home/sonListPage"
            },
            {
              title: "主播电台",
              dataId: "14",
              to: "/home/station"
            },
            {
              title: "歌手",
              dataId: "15",
              to: "/home/songerPage"
            },
            {
              title: "新碟上架",
              dataId: "16",
              to: "/home/newCD"
            }
          ]
        },
        {
          title: "我的音乐",
          dataId: "2",
          to: "/myMusic"
        },
        {
          title: "朋友",
          dataId: "3",
          to: "/friend"
        }
      ]
    };
  },
  methods: {
    fistNavClc(id) {
      this.navLi.forEach(item => {
        if (item.dataId === id) {
          if (location.pathname === item.to) {
            return;
          }
          this.$router.push(item.to);
        }
      });
    }
  }
};
</script>

<style>
</style>