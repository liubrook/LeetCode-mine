// 23. 合并 K 个升序链表
// 困难
// 2.5K
// 相关企业
// 给你一个链表数组，每个链表都已经按升序排列。

// 请你将所有链表合并到一个升序链表中，返回合并后的链表。



// 示例 1：

// 输入：lists = [[1, 4, 5], [1, 3, 4], [2, 6]]
// 输出：[1, 1, 2, 3, 4, 4, 5, 6]
// 解释：链表数组如下：
// [
//   1 -> 4 -> 5,
//   1 -> 3 -> 4,
//   2 -> 6
// ]
// 将它们合并到一个有序链表中得到。
// 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6
// 示例 2：

// 输入：lists = []
// 输出：[]
// 示例 3：

// 输入：lists = [[]]
// 输出：[]


// 提示：

// k == lists.length
// 0 <= k <= 10 ^ 4
// 0 <= lists[i].length <= 500
//   - 10 ^ 4 <= lists[i][j] <= 10 ^ 4
// lists[i] 按 升序 排列
// lists[i].length 的总和不超过 10 ^ 4

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  // 合并从 lists[i] 到 lists[j-1] 的链表
  function dfs(i, j) {
    const m = j - i;
    if (m === 0) return null; // 注意输入的 lists 可能是空的
    if (m === 1) return lists[i]; // 无需合并，直接返回
    const left = dfs(i, i + (m >> 1)); // 合并左半部分
    const right = dfs(i + (m >> 1), j); // 合并右半部分
    return mergeTwoLists(left, right); // 最后把左半和右半合并
  }
  return dfs(0, lists.length);
};

var mergeTwoLists = function (list1, list2) {
  let dummy = new ListNode(); // 用哨兵节点简化代码逻辑
  let cur = dummy; // cur 指向新链表的末尾
  while (list1 && list2) {
    if (list1.val < list2.val) {
      cur.next = list1; // 把 list1 加到新链表中
      list1 = list1.next;
    } else { // 注：相等的情况加哪个节点都是可以的
      cur.next = list2; // 把 list2 加到新链表中
      list2 = list2.next;
    }
    cur = cur.next;
  }
  cur.next = list1 ? list1 : list2; // 拼接剩余链表
  return dummy.next;
};