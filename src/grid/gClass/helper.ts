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

export const generateColumns = (num = 1000) => {
  const columns: any[] = []
  const usedFields = new Set() // To ensure field and title uniqueness

  for (let i = 0; i < num; i++) {
    let field, title
    // Generate unique field
    do {
      field = `field_${Math.floor(Math.random() * 1e6)}`
    } while (usedFields.has(field))
    usedFields.add(field)
    // Generate unique title
    do {
      title = `Title ${Math.floor(Math.random() * 1e6)}`
    } while (usedFields.has(title))
    usedFields.add(title)
    // Generate random width between 100 and 300
    const width = Math.floor(Math.random() * 201) + 100
    columns.push({ field, width, title })
  }

  return columns
}
export const uniqueId = () => {
  return _uniqueId() //
}

export const calStartIndex = (data, mesIndex, metaMeta) => {
  let i = mesIndex
  for (; i < data.length; i++) {
  }
  return i
}
