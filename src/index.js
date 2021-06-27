const matter = require('gray-matter')
const glob = require('glob')
const path = require('path')
const fs = require('fs')

const filePath = 'tmp/raw/Tils/*.md'
const files = glob.sync(filePath) || []
const { mover } = require('./mover')
files.forEach((file) => {
  console.error(`processing ${file}`)
  fs.writeFileSync(file, mover(fs.readFileSync(file, 'utf8')))
})
