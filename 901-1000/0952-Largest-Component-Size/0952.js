// 952. 按公因数计算最大组件大小
// 给定一个由不同正整数的组成的非空数组 nums ，考虑下面的图：

// 有 nums.length 个节点，按从 nums[0] 到 nums[nums.length - 1] 标记；
// 只有当 nums[i] 和 nums[j] 共用一个大于 1 的公因数时，nums[i] 和 nums[j]之间才有一条边。
// 返回 图中最大连通组件的大小 。



// 示例 1：

// https://assets.leetcode.com/uploads/2018/12/01/ex1.png

// 输入：nums = [4, 6, 15, 35]
// 输出：4
// 示例 2：

// https://assets.leetcode.com/uploads/2018/12/01/ex2.png

// 输入：nums = [20, 50, 9, 63]
// 输出：2
// 示例 3：

// https://assets.leetcode.com/uploads/2018/12/01/ex3.png

// 输入：nums = [2, 3, 6, 7, 4, 12, 21, 39]
// 输出：8


// 提示：

// 1 <= nums.length <= 2 * 104
// 1 <= nums[i] <= 105
// nums 中所有值都 不同


/**
 * @param {number[]} nums
 * @return {number}
 */
var largestComponentSize = function (nums) {
  const m = _.max(nums);;
  const uf = new UnionFind(m + 1);
  for (const num of nums) {
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) {
        uf.union(num, i);
        uf.union(num, Math.floor(num / i));
      }
    }
  }
  const counts = new Array(m + 1).fill(0);
  let ans = 0;
  for (let num of nums) {
    const root = uf.find(num);
    counts[root]++;
    ans = Math.max(ans, counts[root]);
  }
  return ans;
};

class UnionFind {
  constructor(n) {
    this.parent = new Array(n).fill(0).map((_, i) => i);
    this.rank = new Array(n).fill(0);
  }

  union(x, y) {
    let rootx = this.find(x);
    let rooty = this.find(y);
    if (rootx !== rooty) {
      if (this.rank[rootx] > this.rank[rooty]) {
        this.parent[rooty] = rootx;
      } else if (this.rank[rootx] < this.rank[rooty]) {
        this.parent[rootx] = rooty;
      } else {
        this.parent[rooty] = rootx;
        this.rank[rootx]++;
      }
    }
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }
}