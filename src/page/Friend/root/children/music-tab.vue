<template>
    <div class="music-tab">
        <div class="music-tab-item" v-for="item in itemList" :key="item.title">
            {{item.title}}
        </div>
    </div>
</template>

<script>
export default {
    props:{
        itemList:Array
    }
}
</script>

<style scoped lang="scss">
    .music-tab{
        height: 28px;
       
        &-item{
            width: 88px;
            height: 28px;
            float: left;
            text-align: center;
            line-height: 28px;
            border-bottom: 1px solid #eee;
            border-right: 1px solid #eee;
            cursor: pointer;
            
        }
    }
</style>