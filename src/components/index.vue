<template>
  <div>
    <Grid></Grid>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Grid from '../grid/Grid.vue'
// const clipX = ref(50)
const stageConfig = ref({
  width: 500,
  height: 500,
})
const rectConfig = ref({
  x: 0,
  y: 0,
  width: 300,
  height: 200,
  fill: 'red',
})

// Update clipX dynamically
onMounted(() => {
  // setInterval(() => {
  //   clipX.value += 10 // Increment clipX
  //   if (clipX.value > 300) {
  //     clipX.value = 0 // Reset clipX when it exceeds rect width
  //   }
  // }, 100)
})
</script>

<style>
/* 给画布添加边框，方便查看裁剪效果 */
v-stage {
  border: 1px solid black;
}
</style>
