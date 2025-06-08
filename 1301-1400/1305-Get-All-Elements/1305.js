// 1305. 两棵二叉搜索树中的所有元素
// 给你 root1 和 root2 这两棵二叉搜索树。请你返回一个列表，其中包含 两棵树 中的所有整数并按 升序 排序。.



// 示例 1：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/12/29/q2-e1.png


// 输入：root1 = [2, 1, 4], root2 = [1, 0, 3]
// 输出：[0, 1, 1, 2, 3, 4]
// 示例 2：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/12/29/q2-e5-.png

// 输入：root1 = [1, null, 8], root2 = [8, 1]
// 输出：[1, 1, 8, 8]


// 提示：

// 每棵树的节点数在[0, 5000] 范围内
//   - 105 <= Node.val <= 105


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {number[]}
 */
var getAllElements = function (root1, root2) {
  const nums1 = [];
  const nums2 = [];

  const inorder = (node, res) => {
    if (node) {
      inorder(node.left, res);
      res.push(node.val);
      inorder(node.right, res);
    }
  };

  inorder(root1, nums1);
  inorder(root2, nums2);

  const merged = [];
  let p1 = 0, p2 = 0;
  while (true) {
    if (p1 === nums1.length) {
      for (let i = p2; i < nums2.length; i++) {
        merged.push(nums2[i]);
      }
      break;
    }
    if (p2 === nums2.length) {
      for (let i = p1; i < nums1.length; i++) {
        merged.push(nums1[i]);
      }
      break;
    }
    if (nums1[p1] < nums2[p2]) {
      merged.push(nums1[p1++]);
    } else {
      merged.push(nums2[p2++]);
    }
  }
  return merged;
};