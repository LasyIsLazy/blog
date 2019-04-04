/**
 * 前序遍历：递归
 */
function preOrderTraversal(tree, cb) {
  const { left, right, value } = tree
  cb && cb(value) // 前序遍历先遍历根节点（当前节点)
  if (left) {
    preOrderTraversal(left, cb)
  }
  if (right) {
    preOrderTraversal(right, cb)
  }
}
/**
 * 前序遍历：非递归
 */
function preOrderTraversalNonRec(tree, cb) {
  let node = tree
  const stack = []
  while (node) {
    const { left, right, value } = node
    cb && cb(value)
    node = null
    left && (node = left)
    right && stack.push(right)
    node || (node = stack.pop())
  }
}

/**
 * 中序遍历
 */
function inOrderTraversal(tree, cb) {
  const { left, right, value } = tree
  if (left) {
    inOrderTraversal(left, cb)
  }
  cb && cb(value) // 中序遍历先遍历左节点，然后遍历根节点（即遍历顺序在左和右节点中间）
  if (right) {
    inOrderTraversal(right, cb)
  }
}
/**
 * 中序遍历：非递归
 * 遍历栈：只有在出栈的时候才会进行遍历（回调）
 * 算法过程：
 * 栈不为空时，进入循环：
 * 1. 判断栈顶节点是否有左节点，有则入栈。
 * 2. 否则，栈顶节点出栈，并回调。出栈节点没有右节点且栈不为空，则进入循环：
 *   1. 栈顶结点出栈。
 *   2. 回调。
 * 出栈节点有有右节点：右节点入栈。
 */
function inOrderTraversalNonRec(tree, cb) {
  const stack = [tree] // 访问栈
  let node = tree
  while (stack.length > 0 || node) {
    while ((node = node.left)) {
      // 左节点入栈
      stack.push(node)
    }
    do {
      node = stack.pop() // 栈顶节点出栈，并遍历
      cb(node.value)
    } while (!(node = node.right) && stack.length) // 没有右节点则再进行循环

    node && stack.push(node) // 右节点入栈，进入右子树。
  }
}

/**
 * 后序遍历
 */
function postOrderTraversal(tree, cb) {
  const { left, right, value } = tree
  if (left) {
    postOrderTraversal(left, cb)
  }
  if (right) {
    postOrderTraversal(right, cb)
  }
  // 后序遍历最后遍历根节点
  cb && cb(value)
}

/**
 * 非递归后序遍历
 */
function postOrderTraversalNonRec(tree, cb) {
  const stack = [tree]
  let node = tree
  const vistedRight = []
  const isVisitedRight = ele => vistedRight.findIndex(e => e === ele) !== -1
  while (stack.length || node) {
    while ((node = node.left)) {
      // 一直向左，所有节点入栈。
      stack.push(node)
    }
    node = stack[stack.length - 1]
    while (stack.length && (!(node = node.right) || isVisitedRight(node))) {
      // 回溯到栈中有右节点的节点，对于没有右节点或者右节点已经访问过的节点，继续回溯。
      cb(stack.pop().value)
      node = stack[stack.length - 1]
    }
    if (node) {
      stack.push(node) // 右节点入栈
      vistedRight.push(node)
    }
  }
}

// 测试
const tree = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4 },
    right: {
      value: 5
    }
  },
  right: {
    value: 3,
    left: { value: 6 },
    right: { value: 7 }
  }
}

let result = ''
preOrderTraversal(tree, val => {
  result += val
})
console.log('前序遍历结果', result, '（递归）')
result = ''
preOrderTraversalNonRec(tree, val => {
  result += val
})
console.log('前序遍历结果', result, '（非递归）')
result = ''
inOrderTraversal(tree, val => {
  result += val
})
console.log('中序遍历结果', result, '（递归）')
result = ''
inOrderTraversalNonRec(tree, val => {
  result += val
})
console.log('中序遍历结果', result, '（非递归）')
result = ''
postOrderTraversal(tree, val => {
  result += val
})
console.log('后序遍历结果', result, '（递归）')
result = ''
postOrderTraversalNonRec(tree, val => {
  result += val
})
console.log('后序遍历结果', result, '（非递归）')
