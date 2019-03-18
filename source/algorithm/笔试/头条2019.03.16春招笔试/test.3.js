/**
 * 有N个参赛者围成一圈 （第0个人和第n - 1个人相邻），每个人有自己的参赛分数。
 * 现在给每人发奖品，要求：
 * （1）每人奖品个数起码为1；
 * （2）如果一人的分数高于左右邻居，则其得到的奖品数目也要大于左右邻居。
 * 输入第一个数M是一轮测试中会跑的例子总数；第二个数N是共有多少个参赛者；
 * 接下来N个数是这些参赛者的分数（按照参赛者围成一圈的顺序排列，第0个挨着第N - 1个）。
 * 要求输出最少的奖品数目之和。
 */

const input = `
2
2
1 2
4
1 2 3 3
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
 * 解答：
 */
const count = parseInt(readline())
const results = []
for (let i = 0; i < count; i++) {
  // 人数
  const n = parseInt(readline())
  // 每个人的分数
  const points = readline()
    .split(' ')
    .map(ele => parseInt(ele))
  // 每个人应该获得的奖品数
  const gets = new Array(n).fill(0)
  // 遍历一遍，将所有左右分数都比自己高的人奖品数置为 1
  points.forEach((point, index) => {
    const preIndex = (index - 1 + n) % n
    const nextIndex = (index + 1) % n
    const prePoint = points[preIndex]
    const nextPoint = points[nextIndex]
    if (prePoint >= point && nextPoint >= point) {
      // point 是最小的 => 奖品数置为 1
      gets[index] = 1
    }
  })

  // 遍历所有没确定礼物（get === 0）的人，计算应该获得的礼物s
  gets.forEach((get, index) => {
    if (get === 0) {
      caculateGet(points, gets, index)
    }
  })
  // 加和
  results.push(gets.reduce((pre, cur) => pre + cur))
}
function caculateGet(points, gets, index) {
  const n = points.length
  const point = points[index]
  const preIndex = (index - 1 + n) % n
  const nextIndex = (index + 1) % n
  // 确保比左右分数比其低的人拿到更多礼物
  if (points[preIndex] < point) {
    if (gets[preIndex] === 0) { // 如果左右的分数没确定递归进行计算
      caculateGet(points, gets, preIndex)
    }
    gets[index] = Math.max(gets[preIndex] + 1, gets[index])
  }
  if (points[nextIndex] < point) {
    if (gets[nextIndex] === 0) {
      caculateGet(points, gets, nextIndex)
    }
    gets[index] = Math.max(gets[nextIndex] + 1, gets[index])
  }
}

print(results.join('\n'))

/**
 * 参考：https://blog.csdn.net/XH413235699/article/details/88595458
 */