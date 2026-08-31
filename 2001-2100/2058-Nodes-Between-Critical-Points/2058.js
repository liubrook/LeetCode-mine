// 2058. 找出临界点之间的最小和最大距离
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 链表中的 临界点 定义为一个 局部极大值点 或 局部极小值点 。

// 如果当前节点的值 严格大于 前一个节点和后一个节点，那么这个节点就是一个  局部极大值点 。

// 如果当前节点的值 严格小于 前一个节点和后一个节点，那么这个节点就是一个  局部极小值点 。

// 注意：节点只有在同时存在前一个节点和后一个节点的情况下，才能成为一个 局部极大值点 / 极小值点 。

// 给你一个链表 head ，返回一个长度为 2 的数组 [minDistance, maxDistance] ，其中 minDistance 是任意两个不同临界点之间的最小距离，maxDistance 是任意两个不同临界点之间的最大距离。如果临界点少于两个，则返回 [-1，-1] 。

// 示例 1：

// https://assets.leetcode.com/uploads/2021/10/13/a1.png

// 输入：head = [3,1]
// 输出：[-1,-1]
// 解释：链表 [3,1] 中不存在临界点。
// 示例 2：

// https://assets.leetcode.com/uploads/2021/10/13/a2.png

// 输入：head = [5,3,1,2,5,1,2]
// 输出：[1,3]
// 解释：存在三个临界点：
// - [5,3,1,2,5,1,2]：第三个节点是一个局部极小值点，因为 1 比 3 和 2 小。
// - [5,3,1,2,5,1,2]：第五个节点是一个局部极大值点，因为 5 比 2 和 1 大。
// - [5,3,1,2,5,1,2]：第六个节点是一个局部极小值点，因为 1 比 5 和 2 小。
// 第五个节点和第六个节点之间距离最小。minDistance = 6 - 5 = 1 。
// 第三个节点和第六个节点之间距离最大。maxDistance = 6 - 3 = 3 。
// 示例 3：

// https://assets.leetcode.com/uploads/2021/10/14/a5.png

// 输入：head = [1,3,2,2,3,2,2,2,7]
// 输出：[3,3]
// 解释：存在两个临界点：
// - [1,3,2,2,3,2,2,2,7]：第二个节点是一个局部极大值点，因为 3 比 1 和 2 大。
// - [1,3,2,2,3,2,2,2,7]：第五个节点是一个局部极大值点，因为 3 比 2 和 2 大。
// 最小和最大距离都存在于第二个节点和第五个节点之间。
// 因此，minDistance 和 maxDistance 是 5 - 2 = 3 。
// 注意，最后一个节点不算一个局部极大值点，因为它之后就没有节点了。
// 示例 4：

// https://assets.leetcode.com/uploads/2021/10/13/a4.png

// 输入：head = [2,3,3,2]
// 输出：[-1,-1]
// 解释：链表 [2,3,3,2] 中不存在临界点。

// 提示：

// 链表中节点的数量在范围 [2, 10^5] 内
// 1 <= Node.val <= 10^5
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var nodesBetweenCriticalPoints = function (head) {
  let minDist = -1,
    maxDist = -1;
  let first = -1,
    last = -1,
    pos = 0;
  let cur = head;
  while (cur.next.next) {
    // 获取连续的三个节点的值
    const x = cur.val;
    const y = cur.next.val;
    const z = cur.next.next.val;
    // 如果 y 是临界点
    if (y > Math.max(x, z) || y < Math.min(x, z)) {
      if (last !== -1) {
        // 用相邻临界点的距离更新最小值
        minDist = minDist === -1 ? pos - last : Math.min(minDist, pos - last);
        // 用到第一个临界点的距离更新最大值
        maxDist = Math.max(maxDist, pos - first);
      }
      if (first === -1) {
        first = pos;
      }
      // 更新上一个临界点
      last = pos;
    }
    cur = cur.next;
    ++pos;
  }
  return [minDist, maxDist];
};
