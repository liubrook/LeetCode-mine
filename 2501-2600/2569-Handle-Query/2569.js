// 2569. 更新数组后处理求和查询
// 给你两个下标从 0 开始的数组 nums1 和 nums2 ，和一个二维数组 queries 表示一些操作。总共有 3 种类型的操作：

// 操作类型 1 为 queries[i] = [1, l, r] 。你需要将 nums1 从下标 l 到下标 r 的所有 0 反转成 1 或将 1 反转成 0 。l 和 r 下标都从 0 开始。
// 操作类型 2 为 queries[i] = [2, p, 0] 。对于 0 <= i < n 中的所有下标，令 nums2[i] = nums2[i] + nums1[i] * p 。
// 操作类型 3 为 queries[i] = [3, 0, 0] 。求 nums2 中所有元素的和。
// 请你返回一个数组，包含所有第三种操作类型的答案。



// 示例 1：

// 输入：nums1 = [1, 0, 1], nums2 = [0, 0, 0], queries = [[1, 1, 1], [2, 1, 0], [3, 0, 0]]
// 输出：[3]
// 解释：第一个操作后 nums1 变为[1, 1, 1] 。第二个操作后，nums2 变成[1, 1, 1] ，所以第三个操作的答案为 3 。所以返回[3] 。
// 示例 2：

// 输入：nums1 = [1], nums2 = [5], queries = [[2, 0, 0], [3, 0, 0]]
// 输出：[5]
// 解释：第一个操作后，nums2 保持不变为[5] ，所以第二个操作的答案是 5 。所以返回[5] 。


// 提示：

// 1 <= nums1.length, nums2.length <= 10^5
// nums1.length = nums2.length
// 1 <= queries.length <= 10^5
// queries[i].length = 3
// 0 <= l <= r <= nums1.length - 1
// 0 <= p <= 10^6
// 0 <= nums1[i] <= 1
// 0 <= nums2[i] <= 10^9


/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[][]} queries
 * @return {number[]}
 */
var handleQuery = function (nums1, nums2, queries) {
  const n = nums1.length;
  const m = queries.length;
  const tree = new SegTree(nums1);

  let sum = 0;
  for (const num of nums2) {
    sum += num;
  }
  const list = [];
  for (let i = 0; i < m; i++) {
    if (queries[i][0] === 1) {
      let l = queries[i][1];
      let r = queries[i][2];
      tree.reverseRange(l, r);
    } else if (queries[i][0] === 2) {
      sum += tree.sumRange(0, n - 1) * queries[i][1];
    } else if (queries[i][0] === 3) {
      list.push(sum);
    }
  }
  const ans = new Array(list.length).fill(0);
  for (let i = 0; i < list.length; i++) {
    ans[i] = list[i];
  }
  return ans;
}

class SegTree {
  constructor(nums) {
    const n = nums.length;
    this.arr = new Array(n * 4 + 1);
    this.build(1, 0, n - 1, nums);
  }

  sumRange(left, right) {
    return this.query(1, left, right);
  }

  reverseRange(left, right) {
    this.modify(1, left, right);
  }

  build(id, l, r, nums) {
    this.arr[id] = new SegNode();
    this.arr[id].l = l;
    this.arr[id].r = r;
    this.arr[id].lazytag = false;
    if (l === r) {
      this.arr[id].sum = nums[l];
      return;
    }
    let mid = (l + r) >> 1;
    this.build(2 * id, l, mid, nums);
    this.build(2 * id + 1, mid + 1, r, nums);
    this.arr[id].sum = this.arr[2 * id].sum + this.arr[2 * id + 1].sum;
  }

  /* pushdown函数：下传懒标记，即将当前区间的修改情况下传到其左右孩子结点 */
  pushdown(x) {
    if (this.arr[x].lazytag) {
      this.arr[2 * x].lazytag = !this.arr[2 * x].lazytag;
      this.arr[2 * x].sum = this.arr[2 * x].r - this.arr[2 * x].l + 1 - this.arr[2 * x].sum;
      this.arr[2 * x + 1].lazytag = !this.arr[2 * x + 1].lazytag;
      this.arr[2 * x + 1].sum = this.arr[2 * x + 1].r - this.arr[2 * x + 1].l + 1 - this.arr[2 * x + 1].sum;
      this.arr[x].lazytag = false;
    }
  }

  /* 区间修改 */
  modify(id, l, r) {
    if (this.arr[id].l >= l && this.arr[id].r <= r) {
      this.arr[id].sum = (this.arr[id].r - this.arr[id].l + 1) - this.arr[id].sum;
      this.arr[id].lazytag = !this.arr[id].lazytag;
      return;
    }
    this.pushdown(id);
    let mid = (this.arr[id].l + this.arr[id].r) >> 1;
    if (this.arr[2 * id].r >= l) {
      this.modify(2 * id, l, r);
    }
    if (this.arr[2 * id + 1].l <= r) {
      this.modify(2 * id + 1, l, r);
    }
    this.arr[id].sum = this.arr[2 * id].sum + this.arr[2 * id + 1].sum;
  }

  /* 区间查询 */
  query(id, l, r) {
    if (this.arr[id].l >= l && this.arr[id].r <= r) {
      return this.arr[id].sum;
    }
    if (this.arr[id].r < l || this.arr[id].l > r) {
      return 0;
    }
    this.pushdown(id);
    let res = 0;
    if (this.arr[2 * id].r >= l) {
      res += this.query(2 * id, l, r);
    }
    if (this.arr[2 * id + 1].l <= r) {
      res += this.query(2 * id + 1, l, r);
    }
    return res;
  }
}

class SegNode {
  constructor() {
    this.l = 0;
    this.r = 0;
    this.sum = 0;
    this.lazytag = false;
  }
}