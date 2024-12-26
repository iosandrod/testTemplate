<template>
    <div v-if="x !== 0 && y !== 0" :style="handleStyle" v-bind="props" />
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  // 定义 props
  const props = defineProps({
    x: {
      type: Number,
      default: 0,
    }, 
    y: {
      type: Number,
      default: 0,
    },
    stroke: {
      type: String,
      default: '',
    },
    strokeWidth: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 8,
    },
    borderColor: {
      type: String,
      default: '#000',
    },
  })
  
  // 计算样式
  const handleStyle = computed(() => ({
    position: 'absolute',
    left: `${props.x - props.size / 2}px`,
    top: `${props.y - props.size / 2}px`,
    width: `${props.size}px`,
    height: `${props.size}px`,
    border: `${props.strokeWidth}px ${props.borderColor} solid`,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    background: props.stroke,
    cursor: 'crosshair',
    pointerEvents: 'all',
  }))
  </script>
  