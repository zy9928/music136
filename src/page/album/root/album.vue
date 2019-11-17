<template>
  <div class="page" id="album">
    <main class="albumMain">
      专辑{{id}}
    </main>
    <pageAside kind="album"/>
  </div>
</template>

<script>
import pageAside from './../../../components/pageAside/pageAside';
export default {
  components: {
    pageAside
  },
  props: {
    id: ''
  },
  methods: {
    rememberId(){
      this.$store.commit("aside/singerId", this.id);
    }
  },
  mounted(){
    this.rememberId();
  },
  updated(){
    this.rememberId();
  }
}
</script>

<style>

</style>