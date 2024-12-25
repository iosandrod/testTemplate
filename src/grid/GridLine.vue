<template>
    <v-line
      :points="props.points"
      :stroke="props.stroke"
      :stroke-width="props.strokeWidth"
      :offset-x="props.offsetX"
      :offset-y="props.offsetY"
      :shadow-for-stroke-enabled="false"
      :stroke-scale-enabled="false"
      :hit-stroke-width="0"
      :listening="false"
      :perfect-draw-enabled="false"
    /> 
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  
  // 定义 props
  const props = defineProps({
    points: {
      type: Array,
      required: true,
    },
    stroke: {
      type: String,
      default: '#000',
    },
    strokeWidth: {
      type: Number,
      default: 1,
    },
    offsetX: {
      type: Number,
      default: 0,
    },
    offsetY: {
      type: Number,
      default: 0,
    },
  })
  </script>
  