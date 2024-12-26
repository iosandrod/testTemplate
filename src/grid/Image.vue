<template>
    <template v-if="status === 'loaded'">
      <v-image
        v-bind="restProps"
        :x="computedX"
        :y="computedY"
        :width="computedWidth"
        :height="computedHeight"
        :image="image"
      />
    </template>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import useImage from './hooks/useImage'
  
  // 使用 props 变量
  const props = defineProps({
    url: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
    spacing: {
      type: Number,
      default: 1,
    },
  })
  
  // 提取图片数据
  const { image, width: imageWidth, height: imageHeight, status } = useImage({
    url: props.url,
  })
  
  // 计算宽高比和其他属性
  const aspectRatio = computed(() =>
    Math.min(
      (props.width - props.spacing) / imageWidth.value,
      (props.height - props.spacing) / imageHeight.value,
    ),
  )
  
  const computedX = computed(() => props.x + props.spacing)
  const computedY = computed(() => props.y + props.spacing)
  
  const computedWidth = computed(() =>
    Math.min(imageWidth.value, aspectRatio.value * imageWidth.value),
  )
  const computedHeight = computed(() =>
    Math.min(imageHeight.value, aspectRatio.value * imageHeight.value),
  )
  
  // 剩余属性
  const restProps = computed(() => {
    const { url, width, height, x, y, spacing, ...rest } = props
    return rest
  }) 
  </script>
  