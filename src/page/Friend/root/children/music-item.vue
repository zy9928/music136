<template>
    <div class="music-item">
        <div class="music-item-left">
            <slot name="left" />
        </div>
        <div class="music-item-title">
           {{item.name}}
        </div>
        <div class="music-item-right">
            <slot name="right">
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        item:Object
    },
    data(){
        return{
            
        }
    },
   
}
</script>

<style scoped lang="scss">
.music-item{
    padding: 8px 0;
    overflow: hidden;
    &-left{
        margin-left: 10px;
        float: left;
    }
    &-title{
        margin-left:10px;
        float: left;
    }
    &-right{
        float: right;
        width: 160px;
    }
}
</style>