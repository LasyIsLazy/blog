const input = `
200
`
let i = 1
function readLine() {
  const lines = input.split('\n')
  return lines[i++]
}
function print(...args) {
  console.log(...args)
}

const N = parseInt(readLine())
let money = 1024 - N
const count1 = Math.floor(money / 64)
money -= count1 * 64
const count2 = Math.floor(money / 16)
money -= count2 * 16
const count3 = Math.floor(money / 4)
money -= count3 * 4
const count4 = money
print(count1 + count2 + count3 + count4)