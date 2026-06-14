// 2095. 删除链表的中间节点
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个链表的头节点 head 。删除 链表的 中间节点 ，并返回修改后的链表的头节点 head 。

// 长度为 n 链表的中间节点是从头数起第 ⌊n / 2⌋ 个节点（下标从 0 开始），其中 ⌊x⌋ 表示小于或等于 x 的最大整数。

// 对于 n = 1、2、3、4 和 5 的情况，中间节点的下标分别是 0、1、1、2 和 2 。

// 示例 1：

// https://assets.leetcode.com/uploads/2021/11/16/eg1drawio.png

// 输入：head = [1,3,4,7,1,2,6]
// 输出：[1,3,4,1,2,6]
// 解释：
// 上图表示给出的链表。节点的下标分别标注在每个节点的下方。
// 由于 n = 7 ，值为 7 的节点 3 是中间节点，用红色标注。
// 返回结果为移除节点后的新链表。
// 示例 2：

// https://assets.leetcode.com/uploads/2021/11/16/eg2drawio.png

// 输入：head = [1,2,3,4]
// 输出：[1,2,4]
// 解释：
// 上图表示给出的链表。
// 对于 n = 4 ，值为 3 的节点 2 是中间节点，用红色标注。
// 示例 3：

// https://assets.leetcode.com/uploads/2021/11/16/eg3drawio.png

// 输入：head = [2,1]
// 输出：[2]
// 解释：
// 上图表示给出的链表。
// 对于 n = 2 ，值为 1 的节点 1 是中间节点，用红色标注。
// 值为 2 的节点 0 是移除节点 1 后剩下的唯一一个节点。

// 提示：

// 链表中节点的数目在范围 [1, 10^5] 内
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
 * @return {ListNode}
 */
var deleteMiddle = function (head) {
  if (head.next === null) {
    return null;
  }
  let slow = head;
  let fast = head;
  let pre = null;

  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    pre = slow;
    slow = slow.next;
  }
  pre.next = pre.next.next;
  return head;
};
