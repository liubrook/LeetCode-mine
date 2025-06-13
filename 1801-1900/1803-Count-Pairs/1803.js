// 1803. 统计异或值在范围内的数对有多少
// 给你一个整数数组 nums （下标 从 0 开始 计数）以及两个整数：low 和 high ，请返回 漂亮数对 的数目。

// 漂亮数对 是一个形如(i, j) 的数对，其中 0 <= i < j < nums.length 且 low <= (nums[i] XOR nums[j]) <= high 。



// 示例 1：

// 输入：nums = [1, 4, 2, 7], low = 2, high = 6
// 输出：6
// 解释：所有漂亮数对(i, j) 列出如下：
// - (0, 1): nums[0] XOR nums[1] = 5
//   - (0, 2): nums[0] XOR nums[2] = 3
//     - (0, 3): nums[0] XOR nums[3] = 6
//       - (1, 2): nums[1] XOR nums[2] = 6
//         - (1, 3): nums[1] XOR nums[3] = 3
//           - (2, 3): nums[2] XOR nums[3] = 5
// 示例 2：

// 输入：nums = [9, 8, 4, 2, 1], low = 5, high = 14
// 输出：8
// 解释：所有漂亮数对(i, j) 列出如下：
// - (0, 2): nums[0] XOR nums[2] = 13
//   - (0, 3): nums[0] XOR nums[3] = 11
//     - (0, 4): nums[0] XOR nums[4] = 8
//       - (1, 2): nums[1] XOR nums[2] = 12
//         - (1, 3): nums[1] XOR nums[3] = 10
//           - (1, 4): nums[1] XOR nums[4] = 9
//             - (2, 3): nums[2] XOR nums[3] = 6
//               - (2, 4): nums[2] XOR nums[4] = 5


// 提示：

// 1 <= nums.length <= 2 * 104
// 1 <= nums[i] <= 2 * 104
// 1 <= low <= high <= 2 * 104


/**
 * @param {number[]} nums
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
const HIGH_BIT = 14;
var countPairs = function (nums, low, high) {
  return f(nums, high) - f(nums, low - 1);
};

const f = (nums, x) => {
  root = new Trie();
  let res = 0;

  const add = (num) => {
    let cur = root;
    for (let k = HIGH_BIT; k >= 0; k--) {
      let bit = (num >> k) & 1;
      if (!cur.son[bit]) {
        cur.son[bit] = new Trie();
      }
      cur = cur.son[bit];
      cur.sum++;
    }
  }

  const get = (num, x) => {
    let cur = root;
    let sum = 0;
    for (let k = HIGH_BIT; k >= 0; k--) {
      let r = (num >> k) & 1;
      if (((x >> k) & 1) !== 0) {
        if (cur.son[r]) {
          sum += cur.son[r].sum;
        }
        if (!cur.son[r ^ 1]) {
          return sum;
        }
        cur = cur.son[r ^ 1];
      } else {
        if (!cur.son[r]) {
          return sum;
        }
        cur = cur.son[r];
      }
    }
    sum += cur.sum;
    return sum;
  }

  for (let i = 1; i < nums.length; i++) {
    add(nums[i - 1]);
    res += get(nums[i], x);
  }
  return res;
}

class Trie {
  // son[0] 表示左子树，son[1] 表示右子树
  constructor() {
    this.son = new Array(2).fill(0);
    this.sum = 0;
  }
}