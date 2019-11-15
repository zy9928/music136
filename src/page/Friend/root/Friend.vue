<template>
  <div class="friend">
    <div class="view-wrap">
      <div class="friend-right">
        <div class="userInfo">
          <div class="userInfo-img">
            <img :src="userInfo.avatarUrl" alt />
          </div>
          <div class="userInfo-text">
            <h5>{{userInfo.nickname}}</h5>
            <p>{{userInfo.signature}}</p>
          </div>
          <ul>
            <li>
              <a href="#">
                <em>{{userInfo.eventCount}}</em>
                <i>动态</i>
              </a>
            </li>
            <li>
              <a href="#">
                <em>{{userInfo.follows}}</em>
                <i>关注</i>
              </a>
            </li>
            <li>
              <a href="#">
                <em>{{userInfo.followeds}}</em>
                <i>粉丝</i>
              </a>
            </li>
          </ul>
        </div>
        <div class="otherUser">
          <div class="starUser">
            <div class="title">
              <h5>明星用户</h5>
              <a href @click.prevent="changeAction('star')">换一批</a>
            </div>
            <ul>
              <li v-for="item in artists1" :key="item.id">
                <img :src="item.picUrl" alt />
                <div class="text">
                  <h5>{{item.name}}</h5>
                  <p>歌手</p>
                </div>
                <button>
                  <span class="iconfont iconcc-add"></span>
                  关注
                </button>
              </li>
            </ul>
          </div>
          <div class="likeUser">
            <div class="title">
              <h5>感兴趣的人</h5>
              <a href="#" @click.prevent="changeAction('like')">换一批</a>
            </div>
            <ul>
              <li v-for="item in artists2" :key="item.id">
                <img :src="item.picUrl" alt />
                <div class="text">
                  <h5>{{item.name}}</h5>
                  <p>歌手</p>
                </div>
                <button>
                  <span class="iconfont iconcc-add"></span>
                  关注
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="friend-left">
        <div class="friend-left-title">
          <h1>动态</h1>
          <div class="opa">
            <a href="#">
              <span class="iconfont"></span>
              发动态
            </a>
            <a href="#">
              <span class="iconfont"></span>
              发布视频
            </a>
          </div>
        </div>
        <div class="friend-left-content">
          <Event v-for="item in event" :item="item" :key="item.id"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../../store/index";
import TimeHandle from "../../../utils/TimeHandle";
import { mapState } from "vuex";

export default {
  components:{
    Event:()=>import ("./children/Event.vue")
  },
  //路由拦截
  beforeRouteEnter(to, from, next) {
    console.log("进入朋友页面");
    if (!store.state.user.isLogin) {
      router.push("/fr");
    } else {
      next();
    }
  },
  created() {
    //请求动态列表
    this.getEvents()
      .then(data => {
        this.event = [...this.event, ...data.event];
        this.$store.dispatch("event/setLasttime",data.lasttime);
      })
      .catch(err => {
        console.log(err);
      });
    //获取推荐明星
    this.getArtists(this.limit1, this.offset1)
      .then(data => {
        this.artists1 = data.artists;
      })
      .catch(err => {
        console.log(err);
      });
    //获取感兴趣的人
    this.getArtists(this.limit2, this.offset2)
      .then(data => {
        this.artists2 = data.artists;
      })
      .catch(err => {
        console.log(err);
      });
  },

  data() {
    return {
      pagesize: 20,
      event: [],
      //推荐明星和感兴趣的人相关
      limit1: 3,
      changeNum1: 0, //换一批数字
      artists1: [], //歌手
      limit2: 5,
      changeNum2: 0, //换一批数字
      artists2: [] //歌手
    };
  },
  watch: {
    changeNum1() {
      //获取推荐明星
      this.getArtists(this.limit1, this.offset1)
        .then(data => {
          this.artists1 = data.artists;
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeNum2() {
      //获取感兴趣的人
      this.getArtists(this.limit2, this.offset2)
        .then(data => {
          this.artists2 = data.artists;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    async getEvents() {
      let result = await this.$store.dispatch("event/getEvents", {
        pagesize: this.pagesize,
        lasttime: this.lasttime
      });
      return result.data;
    },
    async getArtists(limit, offset) {
      let result = await this.$store.dispatch("event/getArtists", {
        limit,
        offset
      });

      return result.data;
    },
    changeAction(flag) {
      if (flag === "star") {
        this.changeNum1++;
      } else {
        this.changeNum2++;
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      lasttime:state=>state.event.lasttime
    }),
    offset1() {
      return this.limit1 * this.changeNum1;
    },
    offset2() {
      return this.limit2 * this.changeNum2;
    }
  }
};
</script>

<style scopde lang="scss">
.friend {
  min-height: 678px;
  background: #f5f5f5;
  .view-wrap {
    background: #fff;
    min-height: 678px;
    border-right: 1px solid #ccc;
    .friend-left {
      margin-right: 300px;
      min-height: 815px;
      padding: 20px 30px;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      &-title {
        height: 42px;
        border-bottom: 1px solid #c20c0c;
        line-height: 42px;
        h1 {
          float: left;
          color: #333;
          font-size: 22px;
        }
        .opa {
          float: right;
          font-size: 12px;
          a {
            color: #333;
            padding: 6px 9px;
            border-radius: 28px;
            border: 1px solid #ccc;
            margin-left: 10px;
          }
        }
      }
    }
    .friend-right {
      width: 298px;
      float: right;
      min-height: 678px;
      color: #333;

      .userInfo {
        position: relative;
        height: 193px;
        background: #f2f2f2;
        border-bottom: 1px solid #ccc;
        &-img {
          position: absolute;
          top: 38px;
          left: 30px;
          width: 70px;
          height: 70px;
          img {
            width: 100%;
          }
        }
        &-text {
          h5 {
            top: 40px;
            font-size: 14px;
            width: 180px;
            position: absolute;
            left: 112px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
          }
          p {
            top: 67px;
            height: 38px;
            overflow: hidden;
            line-height: 19px;
            color: #888;
            position: absolute;
            left: 112px;
            width: 160px;
            word-wrap: break-word;
            word-break: break-word;
            white-space: normal;
          }
        }
        ul {
          position: absolute;
          top: 134px;
          left: 13px;
          overflow: hidden;
          li {
            display: inline;
            float: left;
            margin: 0 2px 0 -2px;
            border-left: 1px solid #c2c2c2;
            a {
              display: block;
              padding: 0 20px;
              color: #666;
              &:hover {
                color: #0c73c2;
              }
              em {
                display: block;
                padding: 0 0 9px;
                font-size: 20px;
                line-height: 20px;
                font-family: Arial;
              }
              i {
                display: block;
                padding: 0 0 0 2px;
              }
              em,
              i {
                font-style: normal;
                text-align: left;
              }
            }
          }
        }
      }
      .otherUser {
        padding: 20px 30px;
        min-height: 544px;
        li {
          padding: 10px 0;
        }
        .title {
          height: 25px;
          line-height: 25px;
          border-bottom: 1px solid #dcdcdc;
          margin: 5px 0;
          h5 {
            float: left;
            color: #333;
            font-weight: bold;
          }
          a {
            float: right;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        .starUser {
          ul {
            li {
              height: 55px;
              img {
                width: 45px;
                float: left;
              }
              .text {
                float: left;
                margin-left: 10px;
                h5 {
                  color: #333;
                  font-weight: bold;
                }
                p {
                  color: #a79b9b;
                }
              }
              button {
                float: right;
                cursor: pointer;
                width: 60px;
                height: 25px;
                line-height: 25px;
                text-align: center;
                background: #fafafa;
                font-size: 12px;
                border: 1px solid #ccc;
                border-radius: 4px;
                .iconfont {
                  color: #be2914;
                  font-size: 12px;
                }
              }
            }
          }
        }
        .likeUser {
          ul {
            li {
              height: 45px;
              img {
                width: 45px;
                float: left;
              }
              .text {
                float: left;
                margin-left: 10px;
                h5 {
                  color: #333;
                  font-weight: bold;
                }
                p {
                  color: #a79b9b;
                }
              }
              button {
                float: right;
                cursor: pointer;
                width: 60px;
                height: 25px;
                line-height: 25px;
                text-align: center;
                background: #fafafa;
                font-size: 12px;
                border: 1px solid #ccc;
                border-radius: 4px;
                .iconfont {
                  color: #be2914;
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>