// 655. 输出二叉树
// 给你一棵二叉树的根节点 root ，请你构造一个下标从 0 开始、大小为 m x n 的字符串矩阵 res ，用以表示树的 格式化布局 。构造此格式化布局矩阵需要遵循以下规则：

// 树的 高度 为 height ，矩阵的行数 m 应该等于 height + 1 。
// 矩阵的列数 n 应该等于 2height + 1 - 1 。
// 根节点 需要放置在 顶行 的 正中间 ，对应位置为 res[0][(n - 1) / 2] 。
// 对于放置在矩阵中的每个节点，设对应位置为 res[r][c] ，将其左子节点放置在 res[r + 1][c - 2height - r - 1] ，右子节点放置在 res[r + 1][c + 2height - r - 1] 。
// 继续这一过程，直到树中的所有节点都妥善放置。
// 任意空单元格都应该包含空字符串 "" 。
// 返回构造得到的矩阵 res 。





// 示例 1：
// https://assets.leetcode.com/uploads/2021/05/03/print1-tree.jpg

// 输入：root = [1, 2]
// 输出：
// [["", "1", ""],
// ["2", "", ""]]
// 示例 2：

// https://assets.leetcode.com/uploads/2021/05/03/print2-tree.jpg
// 输入：root = [1, 2, 3, null, 4]
// 输出：
// [["", "", "", "1", "", "", ""],
// ["", "2", "", "", "", "3", ""],
// ["", "", "4", "", "", "", ""]]


// 提示：

// 树中节点数在范围[1, 210] 内
//   - 99 <= Node.val <= 99
// 树的深度在范围[1, 10] 内

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[][]}
 */
var printTree = function (root) {
  const calDepth = (root) => {
    let h = 0;
    if (root.left) {
      h = Math.max(h, calDepth(root.left) + 1);
    }
    if (root.right) {
      h = Math.max(h, calDepth(root.right) + 1);
    }
    return h;
  }

  const dfs = (res, root, r, c, height) => {
    res[r][c] = root.val.toString();
    if (root.left) {
      dfs(res, root.left, r + 1, c - (1 << (height - r - 1)), height);
    }
    if (root.right) {
      dfs(res, root.right, r + 1, c + (1 << (height - r - 1)), height);
    }
  }

  const height = calDepth(root);
  const m = height + 1;
  const n = (1 << (height + 1)) - 1;
  const res = new Array(m).fill(0).map(() => new Array(n).fill(''));
  dfs(res, root, 0, Math.floor((n - 1) / 2), height);
  return res;
};