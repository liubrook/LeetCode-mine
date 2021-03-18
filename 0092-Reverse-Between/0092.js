// 92. 反转链表 II
// 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。

// 说明:
// 1 ≤ m ≤ n ≤ 链表长度。

// 示例:

// 输入: 1 -> 2 -> 3 -> 4 -> 5 -> NULL, m = 2, n = 4
// 输出: 1 -> 4 -> 3 -> 2 -> 5 -> NULL

var reverseBetween = function (head, left, right) {
  const dummy_node = new ListNode(-1);
  dummy_node.next = head;
  let pre = dummy_node;
  for (let i = 0; i < left - 1; ++i) {
    pre = pre.next;
  }

  let cur = pre.next;
  for (let i = 0; i < right - left; ++i) {
    const next = cur.next;
    cur.next = next.next;
    next.next = pre.next;
    pre.next = next;
  }
  return dummy_node.next;
}