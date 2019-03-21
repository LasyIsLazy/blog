const input = `
2
helloo
wooooooow
`
let lineCount = 1
function readline() {
  const lines = input.split('\n')
  return lines[lineCount++]
}
function print(...args) {
  console.log(...args)
}

const n = parseInt(readline())
const resultsArr = []

for (let i = 0; i < n; i++) {
  const str = readline()
  const charArray = str.split('')
  for (let index = 0; index < charArray.length - 1; index++) {
    const char = charArray[index]
    const nextChar = charArray[index + 1]
    if (char === nextChar) {
      // 出现两个字符相等
      const thirdChar = charArray[index + 2]
      if (char === thirdChar) {
        // 三个连续字符相同
        let comporeIndex = index + 3
        while (char === charArray[comporeIndex]) {
          comporeIndex++
        }
        const removeLen = comporeIndex - (index + 2)
        charArray.splice(index + 2, 1) // 删除
      } else {
        const fourthChar = charArray[index + 3]
        if (thirdChar === fourthChar) {
          // 两对相同的字符
          charArray.splice(index + 3, 1)
          index-- // 再次判断
        }
      }
    }
  }
  resultsArr.push(charArray.join(''))
}
print(resultsArr.join('\n'))
