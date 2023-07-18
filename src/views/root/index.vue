<template>
  <div></div>
</template>

<script lang="ts" setup>
import ribbon from './ribbon';
window.ribbon = ribbon; //把ribbon.js中的函数导出，用于在ribbon.xml中配置，从而wps客户端程序能够调用
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
