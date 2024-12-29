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
          <v-group :config="group2Config">
            <template v-for="cell in cells" :key="cell.key">
              <Cell v-bind="cell"></Cell>
            </template>
          </v-group>
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
      @scroll="onHScroll"
      id="hScrollBar"
    >
      <div :style="hScrollBarStyle"></div>
    </div>
    <div style="margin-top: 50px;">
      {{ grid.scrollConfig.vScroll }}
      {{ grid.columnWidth }}
      <input type="text" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, isReactive, watch } from 'vue'
import { PropBridge as _props, createBridge } from './gClass/PropBridge'
import { Grid } from './gClass/Grid'
import { getNextIndex, getPreIndex } from './gClass/helper'
import { workerRun } from './gClass/utils'
import Cell from './Cell.vue'
import {
  getCellPosition,
  getRowEndIndex,
  getColumnEndIndex,
} from './gClass/helper'
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
watch(
  () => {
    return grid.scrollTop
  },
  (newValue, oldValue) => {
    let _value = newValue
    let scrollConfig = grid.scrollConfig
    let startIndex = scrollConfig.startIndex
    let data = grid.data
    if (newValue > oldValue) {
      //向下滚动
      let rowMetadata = grid.rowMetadata
      let nextOffset = getNextIndex(data, startIndex, rowMetadata, _value)
      if (nextOffset != null) {
        grid.scrollConfig.startIndex = nextOffset
      }
    } else {
      //向上滚动
      let rowMetadata = grid.rowMetadata
      let preOffset = getPreIndex(data, startIndex, rowMetadata, _value)
      if (preOffset != null) {
        grid.scrollConfig.startIndex = preOffset
      }
    }
  },
)
watch(
  () => {
    return grid.scrollLeft
  },
  (newValue, oldValue) => {
    let _value = newValue
    let scrollConfig = grid.scrollConfig
    let startIndex = scrollConfig.colStartIndex
    let columns = grid.columns
    if (newValue > oldValue) {
      //向右滚动
      let columnMetadata = grid.columnMetadata
      let nextOffset = getNextIndex(columns, startIndex, columnMetadata, _value)
      if (nextOffset != null) {
        grid.scrollConfig.colStartIndex = nextOffset //
      } //
    } else {
      //向左滚动
      let columnMetadata = grid.columnMetadata
      let preOffset = getPreIndex(columns, startIndex, columnMetadata, _value)
      if (preOffset != null) {
        grid.scrollConfig.colStartIndex = preOffset
      }
    }
  },
)
const stateConfig = computed(() => {
  let height = grid.height;
  let width = grid.width;
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
watch(
  () => {
    return grid.scrollConfig.startIndex
  },
  (newValue) => {
    let data = grid.data
    let rowMetadata = grid.rowMetadata
    let height = grid.height
    let nextIndex = getRowEndIndex(data, newValue, rowMetadata, height) //
    grid.scrollConfig.endIndex = nextIndex
  },
  {
    immediate: true,
  },
)
watch(
  () => {
    return grid.scrollConfig.colStartIndex
  },
  (newValue) => {
    let columns = grid.columns
    let columnMetadata = grid.columnMetadata
    let width = grid.width
    let nextIndex = getColumnEndIndex(columns, newValue, columnMetadata, width) //
    grid.scrollConfig.colEndIndex = nextIndex
  },
  {
    immediate: true,
  },
)
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
  grid.scrollConfig.hScroll = totalWidth //
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
function onHScroll(config) {
  //@ts-ignore
  let scrollLeft = config?.target?.scrollLeft
  //@ts-ignore
  grid.onHScroll(scrollLeft) //
}
let group1Config = computed(() => {})
let group2Config = computed(() => {
  let scrollTop = grid.scrollTop
  let scrollLeft = grid.scrollLeft
  return {
    offsetY: scrollTop,
    offsetX: scrollLeft,
  }
})
const cells = computed(() => {
  let scrollConfig = grid.scrollConfig
  let startIndex = scrollConfig.startIndex
  let endIndex = scrollConfig.endIndex
  let colStartIndex = scrollConfig.colStartIndex
  let colEndIndex = scrollConfig.colEndIndex
  let columns = grid.columns
  let columnMetadata = grid.columnMetadata
  let rowMetadata = grid.rowMetadata
  let data = grid.data
  let showData = data.slice(startIndex, endIndex)
  let showColumns = columns.slice(colStartIndex, colEndIndex)
  let cells: any[] = []
  for (let i = 0; i < showData.length; i++) {
    let row = showData[i]
    for (let j = 0; j < showColumns.length; j++) {
      let column = showColumns[j]
      let rowId = row['singleId']
      let columnId = column['singleId']
      let rowData = rowMetadata[rowId]
      let columnData = columnMetadata[columnId]
      let cell = {
        rowData,
        columnData,
        row: row,
        column: column,
        key: `${rowId}-${columnId}`,
      }
      cells.push(cell)
    }
  } //
  return cells //
})
setInterval(() => {}, 1000)
</script>

<style scoped></style>
