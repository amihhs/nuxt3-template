/* eslint-disable no-console */
import * as fs from 'fs'
import { getCurrentTime } from '../tools'

// write logs file
const LOGS_PATH = './logs'
export function WriteLogs(content: any) {
  try {
    fs.accessSync(LOGS_PATH, fs.constants.W_OK)
  }
  catch (error) {
    fs.mkdirSync(LOGS_PATH)
  }

  const currentDate = getCurrentTime()
  try {
    fs.accessSync(`${LOGS_PATH}/${currentDate}.log`, fs.constants.W_OK)
  }
  catch (error) {
    fs.writeFileSync(`${LOGS_PATH}/${currentDate}.log`, `// ${currentDate}\n`)
  }
  fs.appendFile(`${LOGS_PATH}/${currentDate}.log`, `\n${content}\n`, (err) => {
    if (err) {
      console.log(`------fs appendFile error start ${getCurrentTime('YYYY-MM-DD HH:mm:ss')}------`)
      console.error(err)
      console.log('------fs appendFile error end------')
    }
  })
}

export function formatError(error: Error) {
  return {
    time: getCurrentTime('YYYY-MM-DD HH:mm:ss'),
    type: 'Error',
    name: error.name || '',
    stack: error.stack || '',
    msg: error.message || '',
  }
}

export function formatPromiseRejection(error: PromiseRejectionEvent) {
  return {
    time: getCurrentTime('YYYY-MM-DD HH:mm:ss'),
    type: 'PromiseRejectionEvent',
    name: 'PromiseRejectionEvent',
    msg: error.reason?.message || '',
    stack: error.reason?.stack || '',
  }
}
