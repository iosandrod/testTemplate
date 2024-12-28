<template>
  <div
    :style="{
      height: `${grid.height}px`,
      width: `${grid.width}px`,
      position: 'relative',
    }"
    class="grid"
  >
    <v-stage :config="stateConfig">
      <v-layer>
        <v-group :config="group1Config">
          <v-group :config="group2Config"></v-group>
        </v-group>
      </v-layer>
    </v-stage>
    <div
      :style="{
        height: `${grid.height}px`,
        overflow: 'scroll',
        position: 'absolute',
        left: `${grid.width}px`,
        top: '0px',
      }"
      @scroll="onVScroll"
      id="vScrollBar"
    >
      <div :style="vScrollBarStyle"></div>
    </div>
    <div
      :style="{
        width: `${grid.width}px`,
        overflow: 'scroll',
        position: 'absolute',
        left: '0px',
        top: `${grid.height}px`,
      }"
      onscroll=""
      id="hScrollBar"
    >
      <div :style="hScrollBarStyle"></div>
    </div>
    <div style="margin-top: 50px;">
      {{ grid.scrollConfig.vScroll }}
      <input type="text" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, isReactive } from 'vue'
import { PropBridge as _props, createBridge } from './gClass/PropBridge'
import { Grid } from './gClass/Grid'
import { workerRun } from './gClass/utils'
import { generateColumns, getCellPosition } from './gClass/helper'
import { columns, data } from './gClass/static' //
const props = defineProps()
let _props1 = reactive({
  columnWidth: 100,
  data: data,
  columns: columns,
  height: 700,
  width: 700,
})
//@ts-ignore
// let _data=data.map((row,i)=>{return {index:i,...row}})
// console.log(_data.length)
const grid = createBridge<Grid>(Grid, _props1) //
//设置开始的位置
watchEffect(() => {
  grid.calStartRowIndex() //
  nextTick(() => {
    console.log(grid.scrollConfig.startIndex) //
  })
})
//设置测量位置
watchEffect(() => {})
//设置结束位置//
watchEffect(() => {})
//

//虚拟化垂直位置

//设置metaData

const cells = computed(() => {})
// let columnWidth = computed(() => grid.columnWidth) //
const stateConfig = computed(() => {
  let height = grid.height
  let width = grid.width
  return {
    height,
    width,
  }
})
//垂直滚动条样式
//监听
watchEffect(async () => {
  //行高有关
  let data = grid.data
  let uidArr = data
    .map((row) => row['singleId'])
    .map((id) => {
      //应该是一定会有的
      let obj = grid.rowMetadata[id]
      return obj
    })
    .map((obj) => obj.size)
  let totalHeight = (await workerRun((config: number[]) => {
    let total = config.reduce((pre, cur) => pre + cur, 0)
    return total
  }, uidArr)) as number
  grid.scrollConfig.vScroll = totalHeight //
})
watchEffect(async () => {
  //列宽有关
  let columns = grid.columns
  let uidArr = columns
    .map((row) => row['singleId'])
    .map((id) => {
      //应该是一定会有的
      let obj = grid.columnMetadata[id]
      return obj
    })
    .map((obj) => obj.size)
  let totalWidth = (await workerRun((config: number[]) => {
    let total = config.reduce((pre, cur) => pre + cur, 0)
    return total
  }, uidArr)) as number
  grid.scrollConfig.hScroll = totalWidth
})
//获取所有元数据
const hScrollBarStyle = computed(() => {
  let hScroll = grid.scrollConfig.hScroll //
  let obj = {
    width: `${hScroll}px`,
    height: `1px`,
  }
  return obj
})
const vScrollBarStyle = computed(() => {
  let vScroll = grid.scrollConfig.vScroll //
  let obj = {
    height: `${vScroll}px`,
    width: `1px`, //
  }
  return obj
})
function onVScroll(config: Event) {
  //@ts-ignore
  let scrollTop = config?.target?.scrollTop
  //@ts-ignore
  grid.onVScroll(scrollTop)
}
function onHScroll(config) {}
let group1Config = computed(() => {})
let group2Config = computed(() => {})
</script>

<style scoped></style>
