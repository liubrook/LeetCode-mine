// 2181. 合并零之间的节点
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个链表的头节点 head ，该链表包含由 0 分隔开的一连串整数。链表的 开端 和 末尾 的节点都满足 Node.val == 0 。

// 对于每两个相邻的 0 ，请你将它们之间的所有节点合并成一个节点，其值是所有已合并节点的值之和。然后将所有 0 移除，修改后的链表不应该含有任何 0 。

//  返回修改后链表的头节点 head 。



// 示例 1：

// https://assets.leetcode.com/uploads/2022/02/02/ex1-1.png
// 输入：head = [0, 3, 1, 0, 4, 5, 2, 0]
// 输出：[4, 11]
// 解释：
// 上图表示输入的链表。修改后的链表包含：
// - 标记为绿色的节点之和：3 + 1 = 4
//   - 标记为红色的节点之和：4 + 5 + 2 = 11
// 示例 2：

// https://assets.leetcode.com/uploads/2022/02/02/ex2-1.png
// 输入：head = [0, 1, 0, 3, 0, 2, 2, 0]
// 输出：[1, 3, 4]
// 解释：
// 上图表示输入的链表。修改后的链表包含：
// - 标记为绿色的节点之和：1 = 1
//   - 标记为红色的节点之和：3 = 3
//     - 标记为黄色的节点之和：2 + 2 = 4


// 提示：

// 列表中的节点数目在范围[3, 2 * 10^5] 内
// 0 <= Node.val <= 1000
// 不 存在连续两个 Node.val == 0 的节点
// 链表的 开端 和 末尾 节点都满足 Node.val == 0

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var mergeNodes = function (head) {
  const dummy = new ListNode();
  let tail = dummy;
  let total = 0;
  for (let cur = head.next; cur !== null; cur = cur.next) {
    if (cur.val === 0) {
      const node = new ListNode(total);
      tail.next = node;
      tail = tail.next;
      total = 0;
    } else {
      total += cur.val;
    }
  }

  return dummy.next;
};