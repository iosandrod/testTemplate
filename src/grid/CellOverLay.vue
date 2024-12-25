<template>
    <CellOverlay
      v-if="userStroke"
      :x="x" 
      :y="y"
      :width="width"
      :height="height"
      :stroke-top-color="strokeTopColor"
      :stroke-right-color="strokeRightColor"
      :stroke-bottom-color="strokeBottomColor"
      :stroke-left-color="strokeLeftColor"
      :stroke-top-dash="strokeTopDash"
      :stroke-right-dash="strokeRightDash"
      :stroke-bottom-dash="strokeBottomDash"
      :stroke-left-dash="strokeLeftDash"
      :stroke-top-width="strokeTopWidth"
      :stroke-right-width="strokeRightWidth"
      :stroke-bottom-width="strokeBottomWidth"
      :stroke-left-width="strokeLeftWidth"
      :line-cap="lineCap"
    />
  </template>
  
  <script setup>
  import { defineProps, computed } from 'vue'
  import { Shape } from 'konva/lib/Shape'
  
  // 定义 props
  const props = defineProps({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    stroke: { type: String, default: null },
    strokeTopColor: { type: String, default: null },
    strokeRightColor: { type: String, default: null },
    strokeBottomColor: { type: String, default: null },
    strokeLeftColor: { type: String, default: null },
    strokeDash: { type: Array, default: () => [] },
    strokeTopDash: { type: Array, default: () => [] },
    strokeRightDash: { type: Array, default: () => [] },
    strokeBottomDash: { type: Array, default: () => [] },
    strokeLeftDash: { type: Array, default: () => [] },
    strokeWidth: { type: Number, default: 1 },
    strokeTopWidth: { type: Number, default: 1 },
    strokeRightWidth: { type: Number, default: 1 },
    strokeBottomWidth: { type: Number, default: 1 },
    strokeLeftWidth: { type: Number, default: 1 },
    lineCap: { type: String, default: 'butt' },
  })
  
  // 计算是否有用户自定义的边框
  const userStroke = computed(() => {
    return (
      props.strokeTopColor ||
      props.strokeRightColor ||
      props.strokeBottomColor ||
      props.strokeLeftColor
    )
  })
  
  const getOffsetFromWidth = width => {
    return width / 2 - 0.5
  }
  </script>
  
  <script>
  // CellOverlay 组件
  import { h } from 'vue'
  export const CellOverlay = {
    props: {
      x: Number,
      y: Number,
      width: Number,
      height: Number,
      strokeTopColor: String,
      strokeRightColor: String,
      strokeBottomColor: String,
      strokeLeftColor: String,
      strokeTopDash: Array,
      strokeRightDash: Array,
      strokeBottomDash: Array,
      strokeLeftDash: Array,
      strokeTopWidth: Number,
      strokeRightWidth: Number,
      strokeBottomWidth: Number,
      strokeLeftWidth: Number,
      lineCap: String,
    },
    render() {
      return h(Shape, {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        sceneFunc: (context, shape) => {
          // Top border
          if (this.strokeTopColor) {
            context.beginPath()
            context.moveTo(
              this.strokeLeftColor
                ? -getOffsetFromWidth(this.strokeLeftWidth)
                : 0,
              0.5,
            )
            context.lineTo(
              shape.width() +
                (this.strokeRightColor
                  ? getOffsetFromWidth(this.strokeRightWidth) + 1
                  : 1),
              0.5,
            )
            context.setAttr('strokeStyle', this.strokeTopColor)
            context.setAttr('lineWidth', this.strokeTopWidth)
            context.setAttr('lineCap', this.lineCap)
            context.setLineDash(this.strokeTopDash)
            context.stroke()
          }
  
          // Bottom border
          if (this.strokeBottomColor) {
            context.beginPath()
            context.moveTo(
              this.strokeLeftColor
                ? -getOffsetFromWidth(this.strokeLeftWidth)
                : 0,
              shape.height() + 0.5,
            )
            context.lineTo(
              shape.width() +
                (this.strokeRightColor
                  ? getOffsetFromWidth(this.strokeRightWidth) + 1
                  : 1),
              shape.height() + 0.5,
            )
            context.setAttr('lineWidth', this.strokeBottomWidth)
            context.setAttr('strokeStyle', this.strokeBottomColor)
            context.setAttr('lineCap', this.lineCap)
            context.setLineDash(this.strokeBottomDash)
            context.stroke()
          }
  
          // Left border
          if (this.strokeLeftColor) {
            context.beginPath()
            context.moveTo(
              0.5,
              this.strokeTopColor ? -getOffsetFromWidth(this.strokeTopWidth) : 0,
            )
            context.lineTo(
              0.5,
              shape.height() +
                (this.strokeBottomColor
                  ? getOffsetFromWidth(this.strokeBottomWidth) + 1
                  : 1),
            )
            context.setAttr('strokeStyle', this.strokeLeftColor)
            context.setAttr('lineWidth', this.strokeLeftWidth)
            context.setAttr('lineCap', this.lineCap)
            context.setLineDash(this.strokeLeftDash)
            context.stroke()
          }
  
          // Right border
          if (this.strokeRightColor) {
            context.beginPath()
            context.moveTo(
              shape.width() + 0.5,
              this.strokeTopColor ? -getOffsetFromWidth(this.strokeTopWidth) : 0,
            )
            context.lineTo(
              shape.width() + 0.5,
              shape.height() +
                (this.strokeBottomColor
                  ? getOffsetFromWidth(this.strokeBottomWidth) + 1
                  : 1),
            )
            context.setAttr('strokeStyle', this.strokeRightColor)
            context.setAttr('lineWidth', this.strokeRightWidth)
            context.setAttr('lineCap', this.lineCap)
            context.setLineDash(this.strokeRightDash)
            context.stroke()
          }
        },
      })
    },
  }
  </script>
  