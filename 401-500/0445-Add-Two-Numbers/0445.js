// 445. 两数相加 II
// 给你两个 非空 链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。

// 你可以假设除了数字 0 之外，这两个数字都不会以零开头。



// 示例1：

// https://pic.leetcode-cn.com/1626420025-fZfzMX-image.png

// 输入：l1 = [7, 2, 4, 3], l2 = [5, 6, 4]
// 输出：[7, 8, 0, 7]
// 示例2：

// 输入：l1 = [2, 4, 3], l2 = [5, 6, 4]
// 输出：[8, 0, 7]
// 示例3：

// 输入：l1 = [0], l2 = [0]
// 输出：[0]


// 提示：

// 链表的长度范围为[1, 100]
// 0 <= node.val <= 9
// 输入数据保证链表代表的数字无前导 0


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  l1 = reverseList(l1);
  l2 = reverseList(l2);
  let l3 = addTwo(l1, l2);
  return reverseList(l3);
};

var reverseList = function (head) {
  let pre = null;
  let cur = head;
  while (cur) {
    let nxt = cur.next;
    cur.next = pre;
    pre = cur;
    cur = nxt;
  }
  return pre;
};

var addTwo = function (l1, l2) {
  let dummy = new ListNode(); // 哨兵节点
  let cur = dummy;
  let carry = 0; // 进位
  while (l1 || l2 || carry) {
    if (l1) carry += l1.val; // 节点值和进位加在一起
    if (l2) carry += l2.val; // 节点值和进位加在一起
    cur = cur.next = new ListNode(carry % 10); // 每个节点保存一个数位
    carry = Math.floor(carry / 10); // 新的进位
    if (l1) l1 = l1.next; // 下一个节点
    if (l2) l2 = l2.next; // 下一个节点
  }
  return dummy.next; // 哨兵节点的下一个节点就是头节点
};