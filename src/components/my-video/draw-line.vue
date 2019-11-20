<template>
  <div class="draw-line" ref="line">
    <div class="draw-line-dot" :style="{left:changeWidth+'px'}" ref="dot">
      <span></span>
    </div>
    <div class="line" :style="{width:width+'px'}">
      <span ref="lineIn" :style="{width:changeWidth+'px'}"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: Number,
    moveRate:Number
  },
  data(){
    return{
      lineWidth:0
    }
  },
  mounted() {
    this.drawEvent();
    this.lineWidth = this.$refs.line.offsetWidth;
  },
  methods: {
    drawEvent() {
      let dot = this.$refs.dot;
      let line = this.$refs.line;
      let lineIn = this.$refs.lineIn;
      console.log(this.$refs);
      dot.onmousedown = e => {
        //记录圆点的起始位置
        let startLeft = parseInt(dot.offsetLeft);
        console.log(startLeft);
        //记录起始的鼠标位置
        let clientX = e.clientX;
        console.log(clientX);
        document.onmousemove = e => {
          //计算移动距离
          let moveLeft = e.clientX - clientX + startLeft;
          //设置边界条件
          if(moveLeft<0){
            moveLeft=0;
          }
          
          if(moveLeft>line.offsetWidth){
            moveLeft = line.offsetWidth;
          }


          dot.style.left = moveLeft + "px";
          lineIn.style.width = moveLeft+"px";
          let  rate = moveLeft/line.offsetWidth;
          this.$center.$emit('progresschange',rate);

          document.onmouseup = () => {
            document.onmousemove = null;
          };
        };
      };
    }
  },
  computed:{
    changeWidth(){//改变的宽度
        return this.moveRate*this.lineWidth;
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
    top: -6px;
    left: 0px;
    width: 16px;
    cursor: pointer;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    overflow: hidden;
    z-index: 1;
    span {
      display: block;
      width: 8px;
      height: 8px;
      background: #b9180f;
      border-radius: 50%;
      margin: 4px auto;
    }
  }
}
</style>