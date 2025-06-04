// 894. 所有可能的真二叉树
// 中等
// 相关标签
// 相关企业
// 给你一个整数 n ，请你找出所有可能含 n 个节点的 真二叉树 ，并以列表形式返回。答案中每棵树的每个节点都必须符合 Node.val == 0 。

// 答案的每个元素都是一棵真二叉树的根节点。你可以按 任意顺序 返回最终的真二叉树列表。

// 真二叉树 是一类二叉树，树中每个节点恰好有 0 或 2 个子节点。



// 示例 1：
// https://s3-lc-upload.s3.amazonaws.com/uploads/2018/08/22/fivetrees.png

// 输入：n = 7
// 输出：[[0, 0, 0, null, null, 0, 0, null, null, 0, 0], [0, 0, 0, null, null, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, null, null, null, null, 0, 0], [0, 0, 0, 0, 0, null, null, 0, 0]]
// 示例 2：

// 输入：n = 3
// 输出：[[0, 0, 0]]


// 提示：

// 1 <= n <= 20

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var allPossibleFBT = function (n) {
  // 题目描述的满二叉树不可能是偶数个节点
  if (n % 2 == 0) return [];
  // 备忘录，记录 n 个节点能够组合成的所有可能二叉树
  let memo = new Array(n + 1);
  // 定义：输入一个 n，生成节点树为 n 的所有可能的满二叉树
  let build = (n) => {
    let res = [];
    // base case
    if (n == 1) {
      res.push(new TreeNode(0));
      return res;
    }
    // 避免冗余计算
    if (memo[n]) return memo[n];
    // 递归生成所有符合条件的左右子树
    for (let i = 1; i < n; i += 2) {
      let j = n - i - 1;
      // 利用函数定义，生成左右子树
      let leftSubTree = build(i);
      let rightSubTree = build(j);
      // 左右子树的不同排列也能构成不同的二叉树
      for (let left of leftSubTree) {
        for (let right of rightSubTree) {
          // 生成根节点并加入到结果集中
          res.push(new TreeNode(0, left, right));
        }
      }
    }
    memo[n] = res;
    return res;
  };
  return build(n);
};