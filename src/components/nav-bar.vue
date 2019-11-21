<template>
  <div class="navBar" :class="{marginBig: haveSecond}">
    <div class="navBarBox">
      <div class="logoBox">
        <a href="/home" class="logoLink">
          <img src="./../assets/pagelogo.png" alt="页面logo" class="logoImg" />
        </a>
      </div>
      <nav class="pageNavStair">
        <li
          v-for="(fistNav, fistKey) in navLi"
          :key="fistKey"
          @click="fistNavClc(fistNav.dataId)"
          class="stairNavLi"
          :class="{stairNavActive: pageNow == fistNav.dataId}"
        >
          <span>{{fistNav.title}}</span>
          <i v-show="pageNow == fistNav.dataId"></i>
        </li>
      </nav>
      <nav class="navSecond">
        <ul
          v-for="(fistNav, fistKey) in navLi"
          :key="fistKey"
          v-if="haveSecond"
          class="navSecondBox"
        >
          <router-link
            v-for="(subNav, subKey) in fistNav.subNav"
            :key="subKey"
            :to="subNav.to"
            class="navSecondLi"
          >
            {{subNav.title}}
            <span v-if="subNav.title == '歌单'">®</span>
          </router-link>
        </ul>
      </nav>
      <div class="loginBtn" v-if="!isLogin">
        <span @click="loginAction">登录</span>
        <i></i>
        <b></b>
      </div>
      <div class="loginBtn" v-if="isLogin">
        <img class="headImg" :src="userInfo.avatarUrl" alt="头像" />
        <ul class="userBox">
          <li class="logOut" @click="logoutBtn">
            <span class="el-icon-switch-button"></span>退出
          </li>
        </ul>
      </div>
      <div class="writerCenterBox">
        <p class="writerCenter">创作者中心</p>
      </div>
      <div class="navSearchBox">
        <div class="navSearchWrap">
          <span></span>
          <input
            v-model="keyWord"
            @input="navSearchCha(keyWord)"
            @blur="navSearchBlu"
            @focus="navSearchFoc"
            @keypress="navSearchKey"
            type="text"
            name="navSearch"
            id="navSearch"
            class="navSearch"
            placeholder="音乐/视频/电台/用户"
            autocomplete="off"
          />
        </div>
        <searchCom :dataFocu="isfocus" :dataKey="keyWord"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import searchCom from './navBar/searchCom';
export default {
  components: {
    searchCom
  },
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
      ],
      pageNow: 1,
      haveSecond: true,
      keyWord: '',
      isfocus: false,
      bluTimer: '',
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin,
      userInfo: state => state.user.userInfo,
    })
  },
  methods: {
    fistNavClc(id) {
      this.navLi.forEach(item => {
        if (item.dataId === id) {
          if (location.pathname === item.to) {
            return;
          }
          this.pageNow = item.dataId;
          this.$router.push(item.to);
        }
      });
      if (id == 1) {
        this.haveSecond = true;
      } else {
        this.haveSecond = false;
      }
    },
    //点击登陆按钮,
    loginAction() {
      this.$center.$emit("openWindow", true);
    },
    // 退出dengr
    logoutBtn() {
      try {
        this.$store.dispatch('user/logout');
        this.$center.$emit('changewindow','mainWindow');
      } catch (error) {
        alert('退出失败');
        console.log('error');
      }
    },
    async navSearchCha(str) {
      if(str){
        await this.$store.dispatch("search/getSuggest", {keywords: str});
      }else{
        await this.$store.dispatch("search/getSuggest", {keywords: '阿虎斯哈法鸡外敷'});
      }
    },
    navSearchBlu(){
      clearTimeout(this.bluTimer);
      this.bluTimer = setTimeout(() => {
        this.isfocus = false;
      }, 300);
    },
    navSearchFoc(){
      this.isfocus = true;
    },
    navSearchKey(e){
      if(this.keyWord && e.key == "Enter"){
        this.$router.push({path: `/search/${1}/${this.keyWord}`});
      }
    },
    // 更换路由或刷新页面时更新nav状态
    refureshNav(arr) {
      var isFind = false;
      arr.forEach(item => {
        if (item.path.indexOf("my") != -1 || item.path.indexOf("friend") != -1) {
          this.haveSecond = false;
          isFind = true;
        }
        if (item.path.indexOf("home") != -1) {
          this.pageNow = 1;
        }else if (item.path.indexOf("my") != -1) {
          this.pageNow = 2;
        } else if (item.path.indexOf("friend") != -1) {
          this.pageNow = 3;
        }else {
          this.pageNow = 1;
        }
      });
      if (!isFind) {
        this.haveSecond = true;
      }
    }
  },
  watch: {
    $route(newVal) {
      this.refureshNav(newVal.matched)
    }
  }
};
</script>

<style scoped lang="scss">
.navBar {
  width: 100%;
  height: 69px;
  border-bottom: 1px solid #000000;
  background-color: #242424;
  min-width: 1135px;
  margin-bottom: 5px;
  @import "./navBar/style/navBarBox.scss";
  @import "./navBar/style/loginBtn.scss";
  .writerCenterBox {
    height: 69px;
    display: flex;
    align-items: center;
    float: right;
    margin-left: 12px;
    .writerCenter {
      padding: 0 12px;
      border: 1px solid #4f4f4f;
      font-size: 12px;
      color: #c2c2c2;
      line-height: 30px;
      border-radius: 15px;
      cursor: pointer;
    }
  }
  @import "./navBar/style/searchBox.scss";
}
.marginBig {
  margin-bottom: 35px;
}
</style>