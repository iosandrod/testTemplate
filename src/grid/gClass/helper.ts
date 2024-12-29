import { uniqueId as _uniqueId } from 'xe-utils'
export const getCellPosition = (
  row,
  column,
  rowIndex,
  columnIndex,
  totalConfig: {
    offsetLeft: number
    offsetTop: number //
  },
) => {
  let obj = {
    offsetX: 0,
    offsetY: 0,
    sizeX: 0, //
    sizeY: 0, //
  }
  return obj
}

export const uniqueId = () => {
  return _uniqueId() //
}

export const calStartIndex = (data, mesIndex, metaMeta) => {
  let i = mesIndex
  for (; i < data.length; i++) {}
  return i
}

export const getNextIndex = (data, mesIndex, metaMeta, scrollTop) => {
  let i = mesIndex
  for (; i < data.length; i++) {
    // debugger
    let _row = data[i]
    let metaData = metaMeta[_row['singleId']]
    let offset = metaData['offset']
    if (offset <= scrollTop && offset + metaData['size'] >= scrollTop) {
      //如果小于当前滚动的位置,那么就是下一个
      return i
    }
  }
}

export const getPreIndex = (data, mesIndex, metaMeta, scrollTop) => {
  let i = mesIndex
  for (; i >= 0; i--) {
    let _row = data[i]
    let metaData = metaMeta[_row['singleId']]
    let offset = metaData['offset']
    if (offset <= scrollTop && offset + metaData['size'] >= scrollTop) {
      //如果小于当前滚动的位置,那么就是下一个
      return i
    }
  }
}

export const getRowEndIndex = (data, mesIndex, metaMeta, containHeight) => {
  let i = mesIndex
  let _offset = data[i]['singleId']
  let metaData = metaMeta[_offset]
  let startOffset = metaData['offset'] //左侧的偏移
  for (; i < data.length; i++) {
    let _row = data[i]
    let metaData = metaMeta[_row['singleId']]
    let offset = metaData['offset']
    if (offset - startOffset >= containHeight) {
      return i
    }
  }
  return null
}

export const getColumnEndIndex = (data, mesIndex, metaMeta, containWidth) => {
  let i = mesIndex
  let _offset = data[i]['singleId']
  let metaData = metaMeta[_offset]
  let startOffset = metaData['offset'] //左侧的偏移
  for (; i < data.length; i++) {
    let _row = data[i]
    let metaData = metaMeta[_row['singleId']]
    let offset = metaData['offset']
    if (offset - startOffset >= containWidth) {
      return i
    }
  }
  return null
}
