<template>
  <div>
    <div class="draw-line" v-if="model=='0'" ref="line" :style="{width:width+'px'}">
      <div
        class="draw-line-dot"
        :style="{left:changeWidth+'px',width:dotSize+'px',height:dotSize+'px',top:-(6/16)*dotSize+'px'}"
        ref="dot"
      >
        <span
          :style="{
        width:dotSize/2+'px',height:dotSize/2+'px',
        margin:(dotSize/4)+'px auto'
      }"
        ></span>
      </div>
      <div class="line" :style="{width:width+'px'}">
        <span ref="lineIn" :style="{width:changeWidth+'px'}"></span>
      </div>
    </div>
    <div
      class="draw-line"
      v-else-if="model=='1'"
      ref="line"
      :style="{width:width+'px',height:height+'px'}"
    >
      <div
        class="draw-line-dot"
        :style="{top:changeTop+'px',width:dotSize+'px',height:dotSize+'px',left:-(6/16)*dotSize+'px'}"
        ref="dot"
      >
        <span
          :style="{
        width:dotSize/2+'px',height:dotSize/2+'px',
        margin:(dotSize/4)+'px auto'
      }"
        ></span>
      </div>
      <div class="line" :style="{height:height+'px',background:'#b9180f'}">
        <span ref="lineIn" style="background:#fff" :style="{height:changeHeight+'px',width:'4px'}"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: Number,
    height: Number,
    moveRate: Number,
    model: {
      type: String,
      default: "0"
    },
    dotSize: {
      type: Number,
      default: 16
    },
    volume: {
      type: Number,
      default: 1
    },
    isMuted: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      lineWidth: 0,
      lineHeight: 0,
      soundRate: 1
    };
  },
  created() {
    
  },
  mounted() {
    this.lineWidth = this.$refs.line.offsetWidth;
    this.lineHeight = this.$refs.line.offsetHeight;
    if (this.model == "0") {
      //0表示视频模式的
      this.drawEvent((moveLeft, line) => {
        let rate = moveLeft / line.offsetWidth;
        this.$center.$emit("progresschange", rate);
      });
    } else {
      this.drawEvent((moveTop, line) => {
        this.soundRate = moveTop / this.height;
        this.$center.$emit("soundchange", this.soundRate);
      });
    }
  },
  methods: {
    drawEvent(callback) {
      let dot = this.$refs.dot;
      let line = this.$refs.line;
      let lineIn = this.$refs.lineIn;
      dot.onmousedown = e => {
        //记录圆点的起始位置
        let start = parseInt(dot.offsetLeft);
        if (this.model == "0") {
          start = parseInt(dot.offsetLeft);
        } else {
          start = parseInt(dot.offsetTop);
        }
        //记录起始的鼠标位置
        let clientX = e.clientX;
        let clientY = e.clientY;
        document.onmousemove = e => {
          //计算移动距离
          let moveLeft = e.clientX - clientX + start;
          let moveTop = e.clientY - clientY + start;
          //设置边界条件
          if (moveLeft < 0) {
            moveLeft = 0;
          }

          if (moveLeft > line.offsetWidth) {
            moveLeft = line.offsetWidth;
          }

          if (moveTop < 0) {
            moveTop = 0;
          }

          if (moveTop > line.offsetHeight) {
            moveTop = line.offsetHeight;
          }

          if (this.model == "0") {
            dot.style.left = moveLeft + "px";
            lineIn.style.width = moveLeft + "px";
            callback(moveLeft, line);
          } else {
            dot.style.top = moveTop + "px";
            lineIn.style.height = moveTop + "px";
            callback(moveTop, line);
          }
          document.onmouseup = () => {
            document.onmousemove = null;
          };
        };
      };
    },
    soundChangeEvent() {
      //设置初始值
    }
  },
  computed: {
    changeWidth() {
      //改变的宽度
      return this.moveRate * this.lineWidth;
    },
    changeHeight() {
      if (this.isMuted) {
        return this.height;
      }
      return (1-this.volume) * this.height;
    },
    changeTop(){
      if(this.isMuted){
        return this.height;
      }

      return this.height*(1-this.volume);
    }
  
  },
  watch:{
    isMuted(){
      if(!this.isMuted){
          this.soundRate = 0;
      }else{
          this.soundRate = this.volume;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.draw-line {
  position: relative;
  user-select: none;
  .line {
    height: 4px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.2);
    position: relative;
    span {
      left: 0;
      height: 4px;
      width: 0px;
      background: #b9180f;
      position: absolute;
      border-radius: 4px;
    }
  }
  &-dot {
    position: absolute;
    // top: -6px;
    top: 0;
    left: 0;
    // width: 16px;
    cursor: pointer;
    // height: 16px;
    border-radius: 50%;
    background: #fff;
    overflow: hidden;
    z-index: 1;
    span {
      display: block;
      // width: 8px;
      // height: 8px;
      background: #b9180f;
      border-radius: 50%;
      margin: 0 auto;
    }
  }
}
</style>