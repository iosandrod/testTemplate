import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '**/node_modules/**',
    '**/dist/**',
    '**/public/**',
    '**/coverage/**',
    '**/tmp/**',
    '**/logs/**'
  ],
  
})
