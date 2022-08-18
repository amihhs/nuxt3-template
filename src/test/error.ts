export function rejectError() {
  return new Promise((_resolve, reject) => {
    reject(new Error('rejectError'))
  })
}
