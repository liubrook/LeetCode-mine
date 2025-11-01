// 3217. 从链表中移除在数组中存在的节点
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个整数数组 nums 和一个链表的头节点 head。从链表中移除所有存在于 nums 中的节点后，返回修改后的链表的头节点。

// 示例 1：

// 输入： nums = [1,2,3], head = [1,2,3,4,5]

// 输出： [4,5]

// 解释：

// https://assets.leetcode.com/uploads/2024/06/11/linkedlistexample0.png

// 移除数值为 1, 2 和 3 的节点。

// 示例 2：

// 输入： nums = [1], head = [1,2,1,2,1,2]

// 输出： [2,2,2]

// 解释：

// https://assets.leetcode.com/uploads/2024/06/11/linkedlistexample1.png

// 移除数值为 1 的节点。

// 示例 3：

// 输入： nums = [5], head = [1,2,3,4]

// 输出： [1,2,3,4]

// 解释：

// https://assets.leetcode.com/uploads/2024/06/11/linkedlistexample2.png

// 链表中不存在值为 5 的节点。

// 提示：

// 1 <= nums.length <= 10^5
// 1 <= nums[i] <= 10^5
// nums 中的所有元素都是唯一的。
// 链表中的节点数在 [1, 10^5] 的范围内。
// 1 <= Node.val <= 10^5
// 输入保证链表中至少有一个值没有在 nums 中出现过。

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {number[]} nums
 * @param {ListNode} head
 * @return {ListNode}
 */
var modifiedList = function (nums, head) {
  const isExist = new Set(nums);
  const sentry = new ListNode(0, head);
  let p = sentry;

  while (p.next) {
    if (isExist.has(p.next.val)) {
      p.next = p.next.next;
    } else {
      p = p.next;
    }
  }
  return sentry.next;
};
