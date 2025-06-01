// 143. 重排链表
// 给定一个单链表 L 的头节点 head ，单链表 L 表示为：

// L0 → L1 → … → Ln - 1 → Ln
// 请将其重新排列后变为：

// L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
// 不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。



// 示例 1：

// https://pic.leetcode-cn.com/1626420311-PkUiGI-image.png

// 输入：head = [1, 2, 3, 4]
// 输出：[1, 4, 2, 3]
// 示例 2：

// https://pic.leetcode-cn.com/1626420320-YUiulT-image.png

// 输入：head = [1, 2, 3, 4, 5]
// 输出：[1, 5, 2, 4, 3]


// 提示：

// 链表的长度范围为[1, 5 * 10^4]
// 1 <= node.val <= 1000


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  // 快慢指针找到链表中点
  let slow = head;
  let fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // cur 指向右半部分链表
  let cur = slow.next;
  slow.next = null;

  // 反转右半部分链表
  let pre = null;
  while (cur) {
    const t = cur.next;
    cur.next = pre;
    pre = cur;
    cur = t;
  }
  cur = head;

  // 此时 cur, pre 分别指向链表左右两半的第一个节点
  // 合并
  while (pre) {
    const t = pre.next;
    pre.next = cur.next;
    cur.next = pre;
    cur = pre.next;
    pre = t;
  }
};