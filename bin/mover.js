var path = require('path'),
  fs = require('fs')
const GenerateSchema = require('generate-schema')

function mover(text = '') {
  let result = ''
  if (text) {
    let textArray = text.split('\n')
    let openFlag = false
    let content = ''
    let frontMatter = ''
    textArray.forEach((line) => {
      if (line === '---') {
        openFlag = !openFlag
      } else {
        if (openFlag) {
          frontMatter = `${frontMatter}\n${line}`
        }
        if (!openFlag) {
          content = `${content}\n${line}`
        }
      }
    })
    frontMatter = frontMatter.replace(/]]/g, '')
    frontMatter = frontMatter.replace(/\[\[/g, ' ')
    result = `---\n${frontMatter}\n---\n${content}`
  }
  return result
}

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath)
  if (fs.existsSync(dirname)) {
    return true
  }
  ensureDirectoryExistence(dirname)
  fs.mkdirSync(dirname)
}

function jsonCreateTable(tableName = 'job_1', jsonArray = []) {
  let SQL = `CREATE TABLE ${tableName} (`
  const {
    items: { properties },
  } = GenerateSchema.json('Job', jsonArray)
  let columnNames = new Set([])
  Object.entries(properties).forEach(([key, { type }], index) => {
    columnNames.add(key.toLowerCase())
  })

  const columnNamesArray = [...columnNames]
  columnNamesArray.forEach((key, index) => {
    let sqlType = 'TEXT'
    SQL = `${SQL}[${key}] ${sqlType}${
      index !== columnNamesArray.length - 1 ? ',' : ''
    }`
  })
  return `${SQL});`
}

module.exports = {
  mover,
  jsonCreateTable,
}
