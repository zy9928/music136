<template>
  <tr id="clauses-item">
    <td>{{index+1}}</td>
    <td>{{item.name}}</td>
    <td>{{time}}</td>
    <td>{{author}}</td>
    <td>{{item.al.name}}</td>
  </tr>
</template>

<script>
import TimeHandle from "../../utils/TimeHandle";

export default {
  name: "clauses-item",
  props: {
    item: {
      type: Object,
      required: true
    },
    index: Number
  },
  computed:{
    author(){
      let nameArr = this.item.ar.map(item=>item.name);
      return nameArr.join('/');
    },
    time(){
       return TimeHandle.getMS(this.item.dt);
    }
  }
};
</script>

<style scoped lang="scss">
#clauses-item {
  td {
    border: 1px solid #bbb;
    color: #333;
    padding: 6px 10px;
  }
}
</style>