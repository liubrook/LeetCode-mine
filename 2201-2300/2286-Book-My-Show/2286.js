// 2286. 以组为单位订音乐会的门票
// 困难
// 相关标签
// 相关企业
// 提示
// 一个音乐会总共有 n 排座位，编号从 0 到 n - 1 ，每一排有 m 个座椅，编号为 0 到 m - 1 。你需要设计一个买票系统，针对以下情况进行座位安排：

// 同一组的 k 位观众坐在 同一排座位，且座位连续 。
// k 位观众中 每一位 都有座位坐，但他们 不一定 坐在一起。
// 由于观众非常挑剔，所以：

// 只有当一个组里所有成员座位的排数都 小于等于 maxRow ，这个组才能订座位。每一组的 maxRow 可能 不同 。
// 如果有多排座位可以选择，优先选择 最小 的排数。如果同一排中有多个座位可以坐，优先选择号码 最小 的。
// 请你实现 BookMyShow 类：

// BookMyShow(int n, int m) ，初始化对象，n 是排数，m 是每一排的座位数。
// int[] gather(int k, int maxRow) 返回长度为 2 的数组，表示 k 个成员中 第一个座位 的排数和座位编号，这 k 位成员必须坐在 同一排座位，且座位连续 。换言之，返回最小可能的 r 和 c 满足第 r 排中[c, c + k - 1] 的座位都是空的，且 r <= maxRow 。如果 无法 安排座位，返回[] 。
// boolean scatter(int k, int maxRow) 如果组里所有 k 个成员 不一定 要坐在一起的前提下，都能在第 0 排到第 maxRow 排之间找到座位，那么请返回 true 。这种情况下，每个成员都优先找排数 最小 ，然后是座位编号最小的座位。如果不能安排所有 k 个成员的座位，请返回 false 。


// 示例 1：

// 输入：
// ["BookMyShow", "gather", "gather", "scatter", "scatter"]
// [[2, 5], [4, 0], [2, 0], [5, 1], [5, 1]]
// 输出：
// [null, [0, 0], [], true, false]

// 解释：
// BookMyShow bms = new BookMyShow(2, 5); // 总共有 2 排，每排 5 个座位。
// bms.gather(4, 0); // 返回 [0, 0]
// // 这一组安排第 0 排 [0, 3] 的座位。
// bms.gather(2, 0); // 返回 []
// // 第 0 排只剩下 1 个座位。
// // 所以无法安排 2 个连续座位。
// bms.scatter(5, 1); // 返回 True
// // 这一组安排第 0 排第 4 个座位和第 1 排 [0, 3] 的座位。
// bms.scatter(5, 1); // 返回 False
// // 总共只剩下 1 个座位。


// 提示：

// 1 <= n <= 5 * 10^4
// 1 <= m, k <= 10^9
// 0 <= maxRow <= n - 1
// gather 和 scatter 总 调用次数不超过 5 * 10^4 次。

/**
 * @param {number} n
 * @param {number} m
 */
var BookMyShow = function (n, m) {
  this.n = n;
  this.m = m;
  this.minTree = new Array(4 * n).fill(0);
  this.sumTree = new Array(4 * n).fill(0);
};

BookMyShow.prototype.modify = function (i, l, r, index, val) {
  if (l === r) {
    this.minTree[i] = val;
    this.sumTree[i] = val;
    return;
  }
  var mid = Math.floor((l + r) / 2);
  if (index <= mid) {
    this.modify(i * 2, l, mid, index, val);
  } else {
    this.modify(i * 2 + 1, mid + 1, r, index, val);
  }
  this.minTree[i] = Math.min(this.minTree[i * 2], this.minTree[i * 2 + 1]);
  this.sumTree[i] = this.sumTree[i * 2] + this.sumTree[i * 2 + 1];
};

BookMyShow.prototype.queryMinRow = function (i, l, r, val) {
  if (l === r) {
    if (this.minTree[i] > val) {
      return this.n;
    }
    return l;
  }
  var mid = Math.floor((l + r) / 2);
  if (this.minTree[i * 2] <= val) {
    return this.queryMinRow(i * 2, l, mid, val);
  } else {
    return this.queryMinRow(i * 2 + 1, mid + 1, r, val);
  }
};

BookMyShow.prototype.querySum = function (i, l, r, l2, r2) {
  if (r < l2 || l > r2) {
    return 0;
  }
  if (l >= l2 && r <= r2) {
    return this.sumTree[i];
  }
  var mid = Math.floor((l + r) / 2);
  return this.querySum(i * 2, l, mid, l2, r2) + this.querySum(i * 2 + 1, mid + 1, r, l2, r2);
};

/** 
 * @param {number} k 
 * @param {number} maxRow
 * @return {number[]}
 */
BookMyShow.prototype.gather = function (k, maxRow) {
  var i = this.queryMinRow(1, 0, this.n - 1, this.m - k);
  if (i > maxRow) {
    return [];
  }
  var used = this.querySum(1, 0, this.n - 1, i, i);
  this.modify(1, 0, this.n - 1, i, used + k);
  return [i, used];
};

/** 
 * @param {number} k 
 * @param {number} maxRow
 * @return {boolean}
 */
BookMyShow.prototype.scatter = function (k, maxRow) {
  var usedTotal = this.querySum(1, 0, this.n - 1, 0, maxRow);
  if ((maxRow + 1) * this.m - usedTotal < k) {
    return false;
  }
  var i = this.queryMinRow(1, 0, this.n - 1, this.m - 1);
  while (true) {
    var used = this.querySum(1, 0, this.n - 1, i, i);
    if (this.m - used >= k) {
      this.modify(1, 0, this.n - 1, i, used + k);
      break;
    }
    k -= this.m - used;
    this.modify(1, 0, this.n - 1, i, this.m);
    i++;
  }
  return true;
};

/**
 * Your BookMyShow object will be instantiated and called as such:
 * var obj = new BookMyShow(n, m)
 * var param_1 = obj.gather(k,maxRow)
 * var param_2 = obj.scatter(k,maxRow)
 */