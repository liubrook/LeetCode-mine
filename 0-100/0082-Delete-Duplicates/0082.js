// 82. 删除排序链表中的重复元素 II
// 给定一个排序链表，删除所有含有重复数字的节点，只保留原始链表中 没有重复出现 的数字。

// 示例 1:

// 输入: 1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5
// 输出: 1 -> 2 -> 5
// 示例 2:

// 输入: 1 -> 1 -> 1 -> 2 -> 3
// 输出: 2 -> 3

var deleteDuplicates = function (head) {
  // 极端情况： 0或1个结点，则不重复
  if (!head || !head.next) {
    return head;
  }
  let dummy = new ListNode();
  // dummy 永远指向头结点
  dummy.next = head;
  // cur 从 dummy 开始遍历
  let cur = dummy;
  while (cur.next && cur.next.next) {
    // 对 cur 后面的两个结点进行比较
    if (cur.next.val === cur.next.next.val) {
      // 若值重复，则保存val值
      let val = cur.next.val;
      // 反复排查后面的元素是否存在多次重复该值的情况
      while (cur.next && cur.next.val === val) {
        // 若有，则删除
        cur.next = cur.next.next;
      }
    } else {
      // 若不相等，则继续遍历
      cur = cur.next;
    }
  }
  return dummy.next;
}