<template>
  <div v-bind="selectionProps"></div>
</template>

<script setup>
// import { createHTMLBox } from './utils'

// 接收来自父组件的 props
const props = defineProps({
  strokeWidth: {
    type: Number,
    default: 1,
  },
  // 你可以根据实际情况定义更多 props，例如：
  // otherProp: {
  //   type: String,
  //   required: true
  // }
})

// 计算 selectionProps（将默认值和传入的 props 合并）
const selectionProps = { strokeWidth: 1, ...props }

// 在模板中渲染 createHTMLBox
// createHTMLBox(selectionProps)
</script>
