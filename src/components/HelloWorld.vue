<template>
  <div class="helloworld">
    <h1>I am a title.</h1>
    <a> written by {{ author }} </a>
    <group>
      <cell title="VUX" value="cool" is-link></cell>
      <router-link to="/vankelife/login">登录</router-link>
    </group>
  </div>
</template>

<script type="text/javascript">
import { Group, Cell } from 'vux';

export default {
  data() {
    return {
      author: 'Endy Yu',
    };
  },
  components: {
    Group,
    Cell,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
