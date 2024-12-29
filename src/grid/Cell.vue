<template>
  <v-group >
    <!-- Rect (背景和边框) -->
    <!-- <v-rect
      :x="x + 0.5"
      :y="y + 0.5"
      :height="height"
      :width="width"
      :fill="fill"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      :shadow-for-stroke-enabled="false"
      :stroke-scale-enabled="false"
      :hit-stroke-width="0"
      :alpha="alpha"
      :fill-enabled="fillEnabled"
      :stroke-enabled="strokeEnabled"
    /> -->
    <v-rect :config="renderConfig"></v-rect>
    <!-- <v-text
      v-if="!isNull(value)"
      :x="x"
      :y="y"
      :height="height"
      :width="width"
      :text="value"
      :fill="textColor"
      :vertical-align="verticalAlign"
      :align="align"
      :font-family="fontFamily"
      :font-style="textStyle"
      :text-decoration="textDecoration"
      :padding="padding"
      :wrap="wrap"
      :font-size="fontSize"
      :hit-stroke-width="0"
    /> -->
    <!-- <v-text :config="{ ...renderConfig, text: 'test' }"></v-text> -->
    <!-- Slot for children -->
    <slot />
  </v-group>
</template>

<script setup>
import { defineProps, computed } from 'vue'
// import { Group, Rect, Text } from 'vue-konva'
// import { isNull } from './helpers'
const props = defineProps({
  rowData: {
    type: Object,
    default: null,
  },
  column: {
    type: Object,
    default: null,
  },
  row: {
    type: Object,
    default: null,
  },
  columnData: {
    type: Object,
    default: null,
  },
})
const renderConfig = computed(() => {
  let { rowData, column, row, columnData } = props
  let offsetY = rowData.offset
  let offsetX = columnData.offset
  let sizeY = rowData.size
  let sizeX = columnData.size
  let x = offsetX
  let y = offsetY
  let width = sizeX
  let height = sizeY
  let obj = { x, y, width, height }
  // console.log(obj, 'testObj') //
  return obj
})
// Props 定义
// const props = defineProps({
//   x: { type: Number, default: 0 },
//   y: { type: Number, default: 0 },
//   width: { type: Number, required: true },
//   height: { type: Number, required: true },
//   value: { type: String, default: null },
//   fill: { type: String, default: "white" },
//   strokeWidth: { type: Number, default: 1 },
//   stroke: { type: String, default: "#d9d9d9" },
//   align: { type: String, default: "left" },
//   verticalAlign: { type: String, default: "middle" },
//   textColor: { type: String, default: "#333" },
//   padding: { type: Number, default: 5 },
//   fontFamily: { type: String, default: "Arial" },
//   fontSize: { type: Number, default: 12 },
//   children: { type: Object, default: null },
//   wrap: { type: String, default: "none" },
//   fontWeight: { type: String, default: "normal" },
//   fontStyle: { type: String, default: "normal" },
//   textDecoration: { type: String, default: null },
//   alpha: { type: Number, default: 1 },
//   strokeEnabled: { type: Boolean, default: true },
//   globalCompositeOperation: { type: String, default: "multiply" },
//   isOverlay: { type: Boolean, default: false },
// });

// // 计算属性
// const fillEnabled = computed(() => !!props.fill);
// const textStyle = computed(() => `${props.fontWeight} ${props.fontStyle}`);
// const rest = computed(() => {
//   // 把剩余的 props 提取到 rest
//   const {
//     x,
//     y,
//     width,
//     height,
//     value,
//     fill,
//     strokeWidth,
//     stroke,
//     align,
//     verticalAlign,
//     textColor,
//     padding,
//     fontFamily,
//     fontSize,
//     children,
//     wrap,
//     fontWeight,
//     fontStyle,
//     textDecoration,
//     alpha,
//     strokeEnabled,
//     globalCompositeOperation,
//     isOverlay,
//     ...others
//   } = props;
//   return others;
// });
</script>
