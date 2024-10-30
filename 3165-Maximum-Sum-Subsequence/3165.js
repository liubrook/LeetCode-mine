

// 示例 1：

// 输入：nums = [3, 5, 9], queries = [[1, -2], [0, -3]]

// 输出：21

// 解释：
// 执行第 1 个查询后，nums = [3, -2, 9]，不包含相邻元素的子序列的最大和为 3 + 9 = 12。
// 执行第 2 个查询后，nums = [-3, -2, 9]，不包含相邻元素的子序列的最大和为 9 。

// 示例 2：

// 输入：nums = [0, -1], queries = [[0, -5]]

// 输出：0

// 解释：
// 执行第 1 个查询后，nums = [-5, -1]，不包含相邻元素的子序列的最大和为 0（选择空子序列）。



// 提示：

// 1 <= nums.length <= 5 * 10^4
//   - 10^5 <= nums[i] <= 10^5
// 1 <= queries.length <= 5 * 10^4
// queries[i] == [posi, xi]
// 0 <= posi <= nums.length - 1
//   - 10^5 <= xi <= 10^5

/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
class SegNode {
  constructor() {
    this.v00 = this.v01 = this.v10 = this.v11 = 0;
  }

  set(v) {
    this.v00 = this.v01 = this.v10 = 0;
    this.v11 = Math.max(v, 0);
  }

  best() {
    return this.v11;
  }
}

class SegTree {
  constructor(n) {
    this.n = n;
    this.tree = Array.from({ length: n * 4 + 1 }, () => new SegNode());
  }

  init(nums) {
    this.internalInit(nums, 1, 1, this.n);
  }

  update(x, v) {
    this.internalUpdate(1, 1, this.n, x + 1, v);
  }

  query() {
    return this.tree[1].best();
  }

  internalInit(nums, x, l, r) {
    if (l === r) {
      this.tree[x].set(nums[l - 1]);
      return;
    }
    const mid = Math.floor((l + r) / 2);
    this.internalInit(nums, x * 2, l, mid);
    this.internalInit(nums, x * 2 + 1, mid + 1, r);
    this.pushup(x);
  }

  internalUpdate(x, l, r, pos, v) {
    if (l > pos || r < pos) {
      return;
    }
    if (l === r) {
      this.tree[x].set(v);
      return;
    }
    const mid = Math.floor((l + r) / 2);
    this.internalUpdate(x * 2, l, mid, pos, v);
    this.internalUpdate(x * 2 + 1, mid + 1, r, pos, v);
    this.pushup(x);
  }

  pushup(x) {
    const l = x * 2, r = x * 2 + 1;
    this.tree[x].v00 = Math.max(this.tree[l].v00 + this.tree[r].v10, this.tree[l].v01 + this.tree[r].v00);
    this.tree[x].v01 = Math.max(this.tree[l].v00 + this.tree[r].v11, this.tree[l].v01 + this.tree[r].v01);
    this.tree[x].v10 = Math.max(this.tree[l].v10 + this.tree[r].v10, this.tree[l].v11 + this.tree[r].v00);
    this.tree[x].v11 = Math.max(this.tree[l].v10 + this.tree[r].v11, this.tree[l].v11 + this.tree[r].v01);
  }
}

const MOD = 1000000007;

var maximumSumSubsequence = function (nums, queries) {
  const n = nums.length;
  const tree = new SegTree(n);
  tree.init(nums);

  let ans = 0;
  for (const q of queries) {
    tree.update(q[0], q[1]);
    ans = (ans + tree.query()) % MOD;
  }
  return ans;
};