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
        </li>
      </nav>
      <nav class="navSecond">
        <ul
          v-for="(fistNav, fistKey) in navLi"
          :key="fistKey"
          v-if="pageNow == fistNav.dataId"
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
      <div class="loginBtn">
        <span>登录</span>
        <i></i>
        <b></b>
      </div>
      <div class="writerCenterBox">
        <p class="writerCenter">创作者中心</p>
      </div>
      <div class="navSearchBox">
        <div class="navSearchWrap">
          <span></span>
          <input
            type="text"
            name="navSearch"
            id="navSearch"
            class="navSearch"
            placeholder="音乐/视频/电台/用户"
          />
        </div>
      </div>
    </div>
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
      ],
      pageNow: 1,
      haveSecond: true
    };
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
    refreshNavActive() {
      this.navLi.forEach(item => {
        if (location.pathname === item.to) {
          console.log("a");
          this.pageNow = item.dataId;
          if (item.dataId == 1) {
            this.haveSecond = true;
          } else {
            this.haveSecond = false;
          }
        }
      });
    }
  },
  mounted() {
    this.refreshNavActive();
  },
  undate() {
    this.refreshNavActive();
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
  .navBarBox {
    width: 1102px;
    margin: 0 auto;
    height: 100%;
    // logo
    .logoBox {
      height: 100%;
      margin-right: 18px;
      position: relative;
      float: left;
      width: 157px;
      .logoLink {
        display: block;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
    }
    // 一级导航
    .pageNavStair {
      height: 100%;
      float: left;
      overflow: hidden;
      position: relative;
      .stairNavLi {
        height: 100%;
        float: left;
        padding: 0 19px;
        font-size: 14px;
        line-height: 69px;
        color: #cccccc;
        list-style: none;
      }
      .stairNavActive {
        color: #ffffff;
        background-color: #000000;
      }
    }
    // 二级导航
    .navSecond {
      clear: both;
      position: absolute;
      top: 70px;
      left: 0;
      right: 0;
      min-width: 1135px;
      background-color: #c20c0c;
      padding: 2px 0; /* 5 */
      border-bottom: 1px solid #a40011;
      .navSecondBox {
        width: 1102px;
        margin: 0 auto;
        overflow: hidden;
        padding-left: 178px;
        box-sizing: border-box;
        .navSecondLi {
          padding: 0 13px;
          line-height: 20px;
          display: block;
          float: left;
          font-size: 12px;
          color: #faf2f2;
          margin: 5px 20px;
          position: relative;
          & > span {
            position: absolute;
            top: -5px;
            right: 3px;
            transform: scale(0.7);
          }
        }
        .router-link-active {
          background-color: #9b0909;
          border-radius: 10px;
        }
      }
    }
  }
  .loginBtn {
    float: right;
    padding: 0 20px;
    font-size: 12px;
    color: #787878;
    line-height: 69px;
    position: relative;
    & > i {
      display: none;
      background-color: #202020;
      height: 2px;
      width: 150px;
      position: absolute;
      top: 55px;
      left: 50%;
      transform: translateX(-50%);
    }
    & > b {
      display: none;
      width: 12px;
      height: 7px;
      position: absolute;
      background: url(./../assets/topbar.png) no-repeat -228px -60px;
      top: 48px;
      left: 50%;
      transform: translateX(-50%) rotate(180deg);
    }
    &:hover > i,
    &:hover > b {
      display: block;
    }
    &:hover {
      color: #999999;
    }
    & > span:hover {
      color: #6e6e6e;
      text-decoration: underline;
      cursor: pointer;
    }
  }
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
    }
  }
  .navSearchBox {
    float: right;
    width: 158px;
    height: 69px;
    display: flex;
    align-items: center;
    .navSearchWrap {
      height: 32px;
      width: 158px;
      background-color: #ffffff;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      & > span {
        display: block;
        width: 13px;
        height: 14px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 7px;
        background: url(./../assets/topbar.png) no-repeat -10px -108px;
      }
      & > input {
        border: none;
        width: 113px;
        font-size: 12px;
        line-height: 12px;
        outline: none;
        color: #9b9b9b;
      }
    }
  }
}
.marginBig {
  margin-bottom: 35px;
}
</style>