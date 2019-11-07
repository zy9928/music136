<template>
    <div class="btn">
        <button @click="handleClick"  :style="{color:fontColor,background:bgColor}">
            <slot/>
        </button>
    </div>
</template>

<script>
export default {
    props:['fontColor','bgColor','click'],
    name:'my-btn',
    methods:{
        handleClick(){
            this.$emit('click');
        }
    }
}
</script>

<style scoped>
.btn button{
    width: 100%;
    height: 31px;
    line-height: 31px;
    font-size: 14px;
    border-radius: 6px;
    border:0;
    text-align: center;
    outline: none;
    cursor: pointer;
}
</style>