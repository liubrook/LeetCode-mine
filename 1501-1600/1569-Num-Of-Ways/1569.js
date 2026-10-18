// 1569. 将子数组重新排序得到同一个二叉搜索树的方案数
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个数组 nums 表示 1 到 n 的一个排列。我们按照元素在 nums 中的顺序依次插入一个初始为空的二叉搜索树（BST）。请你统计将 nums 重新排序后，统计满足如下条件的方案数：重排后得到的二叉搜索树与 nums 原本数字顺序得到的二叉搜索树相同。

// 比方说，给你 nums = [2,1,3]，我们得到一棵 2 为根，1 为左孩子，3 为右孩子的树。数组 [2,3,1] 也能得到相同的 BST，但 [3,2,1] 会得到一棵不同的 BST 。
// 请你返回重排 nums 后，与原数组 nums 得到相同二叉搜索树的方案数。

// 由于答案可能会很大，请将结果对 109 + 7 取余数。

// 示例 1：

// https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/08/30/bb.png

// 输入：nums = [2,1,3]
// 输出：1
// 解释：我们将 nums 重排， [2,3,1] 能得到相同的 BST 。没有其他得到相同 BST 的方案了。
// 示例 2：

// https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/08/30/ex1.png

// 输入：nums = [3,4,5,1,2]
// 输出：5
// 解释：下面 5 个数组会得到相同的 BST：
// [3,1,2,4,5]
// [3,1,4,2,5]
// [3,1,4,5,2]
// [3,4,1,2,5]
// [3,4,1,5,2]
// 示例 3：

// https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/08/30/ex4.png

// 输入：nums = [1,2,3]
// 输出：0
// 解释：没有别的排列顺序能得到相同的 BST 。

// 提示：

// 1 <= nums.length <= 1000
// 1 <= nums[i] <= nums.length
// nums 中所有数 互不相同 。
/**
 * @param {number[]} nums
 * @return {number}
 */
var numOfWays = function (nums) {
  const MOD = BigInt(1000000007);
  const n = nums.length;

  if (n <= 1) {
    return 0;
  }
  const c = Array.from({ length: n }, () => new Array(n).fill(0n));
  c[0][0] = 1n;
  for (let i = 1; i < n; i++) {
    c[i][0] = 1n;
    for (let j = 1; j < n; j++) {
      c[i][j] = (c[i - 1][j - 1] + c[i - 1][j]) % MOD;
    }
  }

  class TNode {
    constructor(val) {
      this.left = null;
      this.right = null;
      this.value = val;
      this.size = 0;
      this.ans = 0n;
    }
  }

  function insert(root, val) {
    let cur = root;
    while (true) {
      cur.size++;
      if (val < cur.value) {
        if (!cur.left) {
          cur.left = new TNode(val);
          cur.left.size = 1;
          return;
        }
        cur = cur.left;
      } else {
        if (!cur.right) {
          cur.right = new TNode(val);
          cur.right.size = 1;
          return;
        }
        cur = cur.right;
      }
    }
  }

  function dfs(node) {
    if (!node) {
      return;
    }
    dfs(node.left);
    dfs(node.right);

    const lsize = node.left ? node.left.size : 0;
    const rsize = node.right ? node.right.size : 0;
    const lans = node.left ? node.left.ans : 1n;
    const rans = node.right ? node.right.ans : 1n;

    node.ans = (((BigInt(c[lsize + rsize][lsize]) * lans) % MOD) * rans) % MOD;
  }

  const root = new TNode(nums[0]);
  root.size = 1;
  for (let i = 1; i < n; i++) {
    insert(root, nums[i]);
  }

  dfs(root);
  return Number((root.ans - 1n + MOD) % MOD);
};
