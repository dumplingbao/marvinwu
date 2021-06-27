#!/usr/bin/env node
const program = require('commander')
const fs = require('fs')
const { mover, jsonCreateTable } = require('./mover')
const glob = require('glob')
const path = require('path')
const matter = require('gray-matter')
const _ = require('lodash')
const jsonfile = require('jsonfile')
const Database = require('better-sqlite3')
var shell = require('shelljs')

program
  .command('cleanDir <globPattern> [limit] ')
  .action((globPattern, limit = 10000000) => {
    const files = glob.sync(globPattern) || []
    const output = []
    let count = 1
    files.every((file) => {
      const isFile = fs.statSync(file).isFile()
      if (isFile) {
        const inputContent = fs.readFileSync(file, 'utf8')
        const outputContent = mover(inputContent)
        fs.writeFileSync(file, outputContent, 'utf8')
      }
      if (count > limit) {
        return false
      }
      count++
      return true
    })
  })

program
  .command('mdToJson <globPattern> [limit] ')
  .action((globPattern, limit = 10000000) => {
    const files = glob.sync(globPattern) || []
    const output = []
    let count = 1
    files.every((file) => {
      // console.error(`processing ${file}`)
      const isFile = fs.statSync(file).isFile()
      if (isFile) {
        const inputContent = fs.readFileSync(file, 'utf8')
        try {
          let { data = null } = matter(inputContent)
          if (typeof data === 'object') {
            let Topic = _.get(data, 'Topic')
            if (typeof Topic === 'string') {
              Topic = [Topic]
            }
            output.push({
              ...data,
              file,
              Topic,
              fileName: path.basename(file, '.md'),
              file_url: encodeURI(path.basename(file)),
            })
          }
        } catch (error) {
          // console.error(error)
        }
      }
      if (count > limit) {
        return false
      }
      count++
      return true
    })
    console.log(JSON.stringify(_.compact(output)))
  })

program
  .command('createTable <dbPath> <filePath>')
  .action((dbPath, filePath) => {
    const jsonArray = jsonfile.readFileSync(filePath)
    const SQL = jsonCreateTable('tils', jsonArray)
    const db = new Database(dbPath)
    db.exec(SQL)
  })

program.command('move <filePath>').action((filePath) => {
  const jsonArray = jsonfile.readFileSync(filePath)
  jsonArray.map((file) => {
    shell.cp('-R', `tmp/${file.file_path}`, `tils/${file.filename}.md`)
  })
})

program.on('command:*', () => {
  console.error(
    'Invalid command: %s\nSee --help for a list of available commands.',
    program.args.join(' ')
  )
  process.exit(1)
})

program.parse(process.argv)
