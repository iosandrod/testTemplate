<template>
  <v-stage :config="stateConfig">
    <v-layer></v-layer>
  </v-stage>
</template>

<script setup lang="ts">
import { ref, computed, isReactive } from 'vue'
import { PropBridge as _props, createBridge } from './gClass/PropBridge'
import { Grid } from './gClass/Grid'
import { generateColumns, getCellPosition } from './gClass/helper'
import { columns, data } from './gClass/static'
const props = defineProps()
let _props1 = reactive({
  columnWidth: 100,
  data: data,
  columns: columns,
})
const grid = createBridge<Grid>(Grid, _props1) //
// console.log(grid.columnMetadata, 'columnMetadata')
// console.log(grid.rowMetadata, 'rowMetadata') //
// console.log(isReactive(grid))
// const cells = computed(() => {
//   let arr: any[] = []
//   let columns = grid.columns
//   let data = grid.data
//   let rowHeight = 30
//   for (let col of columns) {
//     let offsetLeft = 0
//     let offSetTop = 0
//     let _rowHeight = rowHeight //
//     for (let row of data) {
//       offSetTop += rowHeight
//       let position=getCellPosition(row, col)
//       arr.push({
//         row: row,
//         column: col,
//         x: 0,
//         y: 0,
//         width: 0,
//         height: 0, //
//         rowIndex: 0,
//         columnIndex: 0,
//         isMergeCell: false, //
//       })
//     }
//   }
// })
//虚拟化垂直位置

//设置metaData
// watchEffect(() => {
//   let columns = grid.columns //
//   let data = grid.data //
//   let scrollTop = grid.scrollTop //
//   let _config = {
//     offsetLeft: 0,
//     offSetTop: 0,
//   }
//   for (const [colIndex, col] of Object.entries(columns)) {
//     for (const [rowIndex, row] of Object.entries(data)) {
//       // console.log('run this')
//       let position = getCellPosition(row, col, rowIndex, colIndex, _config)
//       let field = col.field //
//     } //
//   } //
// })//
const cells = computed(() => {})
let columnWidth = computed(() => grid.columnWidth) //
const stateConfig = computed(() => {
  let height = grid.height
  let width = grid.width
  return {
    height,
    width,
  }
})
setInterval(() => {
  grid.columnWidth = grid.columnWidth + 10
}, 100)
</script>

<style scoped></style>
