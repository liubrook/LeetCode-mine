// 234. 回文链表
// 请判断一个链表是否为回文链表。

// 示例 1:

// 输入: 1->2
// 输出: false
// 示例 2:

// 输入: 1->2->2->1
// 输出: true
// 进阶：
var isPalindrome = function(head) {
  const vals = []
  while (head !== null) {
    vals.push(head.val)
    head = head.next
  }
  for(let i = 0, j = vals.length - 1; i < j; ++i, --j) {
    if (vals[i] !== vals[j]) {
      return false
    }
  }
  return true
}