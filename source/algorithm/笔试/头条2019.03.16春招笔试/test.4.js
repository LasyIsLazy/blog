const input = `
3 4
3 5 4
`
let i = 1
function readline() {
  const lines = input.split('\n')
  return lines[i++]
}
function print(...args) {
  console.log(...args)
}

/**
 * 解答
 */
// n：绳子数；m：需要的绳子数
const [n, m] = readline()
  .split(' ')
  .map(ele => parseInt(ele))

// 梅根绳子的长度
const lens = readline()
  .split(' ')
  .map(ele => parseInt(ele))

/**
 * 二分查找
 * lower 是一定可以裁剪出来的，因此尽量使 lower更大（直到达到精度时）
 */
let lower = 0.01
let higher = Math.min(...lens)
while (higher - lower > 0.001) {
  const middle = (higher + lower) / 2
  check(middle) ? (lower = middle) : (higher = middle)
}
/**
 * 检查是否可以裁剪出来
 */
function check(len) {
  return lens.map(l => Math.floor(l / len)).reduce((pre, cur) => pre + cur) >= m
}

print(lower.toFixed(2))